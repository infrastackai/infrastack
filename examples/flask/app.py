import psycopg2
from flask import Flask, jsonify, request
from infrastackotel import Configuration, Infrastack
from psycopg2 import pool

config = Configuration(
    service_name="infrastack-flask-example",
)

app = Flask(__name__)

infrastack = Infrastack.configure(config)
infrastack.instrument_flask(app)
infrastack.instrument_psycopg()

# Create a connection pool
connection_pool = None

def get_db_connection():
    global connection_pool
    if connection_pool is None:
        connection_pool = pool.SimpleConnectionPool(
            minconn=1,
            maxconn=10,
            host="localhost",
            database="mydatabase",
            user="myuser",
            password="mypassword"
        )
    return connection_pool.getconn()

def return_db_connection(conn):
    global connection_pool
    if connection_pool:
        connection_pool.putconn(conn)

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello, World!"})

@app.route('/users', methods=['GET'])
def get_users():
    conn = None
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT name, age FROM users")
            users = cur.fetchall()
        return jsonify([{"name": user[0], "age": user[1]} for user in users])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@app.route('/users', methods=['POST'])
def create_user():
    conn = None
    try:
        user_data = request.json
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("INSERT INTO users (name, age) VALUES (%s, %s)", (user_data['name'], user_data['age']))
            conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@app.teardown_appcontext
def close_connection_pool(exception=None):
    global connection_pool
    if connection_pool:
        connection_pool.closeall()
        connection_pool = None

if __name__ == "__main__":
    app.run(port=8000)

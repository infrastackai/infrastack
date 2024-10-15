from typing import List

from fastapi import FastAPI, HTTPException
from infrastackotel import Configuration, Infrastack
from psycopg2 import pool
from pydantic import BaseModel

app = FastAPI()

config = Configuration(
    service_name="infrastack-fastapi-example",
)

infrastack = Infrastack.configure(config)
infrastack.instrument_fastapi(app)
infrastack.instrument_psycopg()

class User(BaseModel):
    name: str
    age: int

connection_pool = pool.SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    host="localhost",
    database="mydatabase",
    user="myuser",
    password="mypassword"
)

def get_db_connection():
    return connection_pool.getconn()

def return_db_connection(conn):
    connection_pool.putconn(conn)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users", response_model=List[User])
def get_users():
    conn = None
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT name, age FROM users")
            users = cur.fetchall()
        return [User(name=user[0], age=user[1]) for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            return_db_connection(conn)

@app.post("/users")
def create_user(user: User):
    conn = None
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("INSERT INTO users (name, age) VALUES (%s, %s)", (user.name, user.age))
            conn.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            return_db_connection(conn)

@app.on_event("shutdown")
def close_connection_pool():
    connection_pool.closeall()

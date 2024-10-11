import express, { Express, Request, Response } from 'express';

const app: Express = express();

type User = {
    name:string;
    age:number;
}
const users:User[] = [
  {
    name:"John",
    age:20
  },
  {
    name:"Jane",
    age:21
  }
];
app.use(express.json());

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.post("/users", (req: Request, res: Response) => {
  const user:User = req.body;
  users.push(user);
  res.send(user);
});
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

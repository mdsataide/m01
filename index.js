const express = require("express");

const server = express();

server.use(express.json());
// Query Params - ?name=marcelo
// Route Params - /users/1
// Request Body(post, put) - { 'name': 'Marcelo', 'email': 'mdsataide@gmail.com' }

const users = ["Marcelo", "Tiago", "Jamil"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is Required!" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = req.params.index;
  if (!user) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  req.user = user;
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(users[req.user]);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);
  
  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen(3000);

const express = require("express");

const server = express();

// Query Params - ?name=marcelo
// Route Params - /users/1
// Request Body(post, put) - { 'name': 'Marcelo', 'email': 'mdsataide@gmail.com' }

const users = ["Marcelo", "Tiago", "Jamil"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.listen(3000);

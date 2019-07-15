const express = require("express");

const server = express();

// Query Params - ?name=marcelo
// Route Params - /users/1
// Request Body(post, put) - { 'name': 'Marcelo', 'email': 'mdsataide@gmail.com' }

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({
    message: `Buscando o usuário com id: ${id}`
  });
});

server.listen(3000);

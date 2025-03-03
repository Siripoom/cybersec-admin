const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.get("/users", async (req, res) => {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
  res.send({
    message: "List of all users",
    data: data,
  });
});

//post
app.post("/users", async (req, res) => {
  const response = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  if (response) {
    res.send({
      message: "User created",
      data: response,
    });
  } else {
    res.send({
      message: "User not created",
    });
  }
});

//update
app.put("/users/:id", async (req, res) => {
  const response = await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  if (response) {
    res.send({
      message: "User updated",
      data: response,
    });
  } else {
    res.send({
      message: "User not updated",
    });
  }
});

//delete
app.delete("/users/:id", async (req, res) => {
  const response = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (response) {
    res.send({
      message: "User deleted",
    });
  } else {
    res.send({
      message: "User not deleted",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

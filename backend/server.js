import express from "express";
import connectDB from "./config/db.js";
import Todo from "./models/todoModel.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/tasks", async (req, res) => {
  const tasks = await Todo.find({});
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = req.body.task;
  const newTask = await Todo.create({ task });
  if (newTask) {
    console.log("task created");
    res.status(201).json({
      _id: newTask._id,
      task: newTask.task,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;
  const result = await Todo.updateOne(
    { _id: id },
    { $set: { task: updatedTask } }
  );
  if (result) {
    res.send("updated");
  } else {
    res.send("not found");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await Todo.findByIdAndDelete({ _id: id });
  if (deletedTodo) {
    res.send(`${id} deleted`);
  } else {
    res.send("not found");
  }
});

app.listen(port, () => console.log(`Server is running in the port ${port}`));

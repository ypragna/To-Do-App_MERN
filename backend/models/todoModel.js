import mongoose from "mongoose";

const todoShema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter a Task"],
  },
});
const Todo = mongoose.model("items", todoShema);

export default Todo;

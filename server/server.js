const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());

const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error);
  }
};

connectMongoDB();

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose?.model("Todo", TodoSchema) || mongoose.models?.Todo;

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

app.get("/todo", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

app.post("/todo", (req, res) => {
  const { content } = req.body;
  const todo = new Todo({
    content: content,
    isCompleted: false,
  });
  todo.save().then((result) => {
    res.status(200).send(result);
  });
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id).then(() => {
    Todo.find().then((result) => {
      res.status(200).send(result);
    });
  });
});

app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  Todo.findByIdAndUpdate(id, { content: content }, { new: true }).then(() => {
    Todo.find().then((result) => {
      res.status(200).send(result);
    });
  });
});

app.put("/todo/status/:id", (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  Todo.findByIdAndUpdate(id, { isCompleted: isCompleted }, { new: true }).then(
    () => {
      Todo.find()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  );
});

app.listen("5000", () => {
  console.log("listening on port 5000");
});

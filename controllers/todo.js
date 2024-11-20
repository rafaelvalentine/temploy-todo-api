const { Todo } = require("../models/todo");

// To Create a Todo
exports.createTodo = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Create a new todo object
  // req.body should strictly follow Todo Model
  const todo = new Todo(req.body);

  // Save the object as document in MongoDb
  todo
    .save()
    .then(({ dataValues }) => {
      res.status(201).json({
        status: "Success",
        message: "Todo Created SuccessFully!",
        todo: dataValues,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};

// To get list of Todos
exports.getTodos = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Set up Todo query
  const TodoQuery = Todo.findAll({
    order: [["createdAt", "DESC"]],
  });
  // Execute todo query
  TodoQuery.then((todos) => {
    if (!todos.length) {
      return res.status(404).json({
        status: "Success",
        message: "No Todos found!",
        todos: todos,
        todoCount: todos.length,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Todos Fetched Successfully!",
      todos: todos,
      todoCount: todos.length,
    });
  }).catch((error) => {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  });
};

// To get a specific Todo
exports.getTodo = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Todo Id to modify
  const todoId = req.params.todoId;

  // Execute todo query
  Todo.findOne({ where: { id: todoId } })
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({
          status: "Success",
          message: "No Todo found with that Id!",
          todo: todo,
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Todo Fetched Successfully!",
        todo: todo,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};

// To Update a Todo
exports.updateTodo = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Todo Id to modify
  const todoId = req.params.todoId;

  // Get Data to be modified
  const data = req.body;

  // Execute Update
  Todo.update(
    { ...data, isCompleted: false },
    {
      where: {
        id: todoId,
      },
    }
  )
    .then(async () => {
      const updatedTodo = await Todo.findOne({ where: { id: todoId } });
      res.status(201).json({
        status: "Success",
        message: "Todo Updated Successfully!",
        todo: updatedTodo,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};

// To Mark todo Complete
exports.completeTodo = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Todo Id to modify
  const todoId = req.params.todoId;

  // Execute Update
  Todo.update(
    {
      isCompleted: true,
    },
    {
      where: {
        id: todoId,
      },
    }
  )
    .then(async () => {
      const updatedTodo = await Todo.findOne({ where: { id: todoId } });
      res.status(201).json({
        status: "Success",
        message: "Todo Marked as Completed!",
        todo: updatedTodo,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};

// To Delete a Todo
exports.deleteTodo = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Todo Id to delete
  const todoId = req.params.todoId;

  // Execute Update
  Todo.destroy({
    where: {
      id: todoId,
    },
  })
    .then(() => {
      res.status(201).json({
        status: "Success",
        message: "Todo Deleted Successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};

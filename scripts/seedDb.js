const { Todo } = require("../models/todo");

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Todo.sync({ force: true });

  //insert data
  await Promise.all([
    Todo.create({
      id: 1,
      title: "Write Test-Cases",
      description: "Write Test-Cases for Todo API",
      onDate: "2019-08-16T15:47:30.889Z",
      cardColor: "#4dd0e1",
    }),
  ]);
}

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class Todo extends Sequelize.Model {}

Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
      default: "N/A",
    },
    onDate: {
      type: DataTypes.STRING,
      required: true,
      default: Date.now,
    },
    cardColor: {
      type: DataTypes.STRING,
      required: true,
      default: "#cddc39",
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      required: true,
      default: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);

Todo.sync();
module.exports = {
  sequelize,
  Todo,
};

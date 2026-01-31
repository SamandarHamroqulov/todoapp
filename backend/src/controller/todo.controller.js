const { globalError, ClientError } = require("shokhijakhon-error-handler");
const todoValidator = require("../utils/todo.validator");
const TodoModel = require("../models/Todo.model");

module.exports = {
  async CREATE_TODO(req, res) {
    try {
      let newTodo = req.body;
      let validate = await todoValidator.validateAsync(newTodo);
      validate.userId = req.user.user_id;
      let insertTodo = await TodoModel.create(validate);
      return res
        .status(201)
        .json({ message: "Todo succesfully created", status: 201 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_TODOS(req, res) {
    try {
      let userId = req.user.user_id ;
      const todos = await TodoModel.find({userId});
      return res.json(todos) 
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_TODO(req, res) {
    try {
      let {id} = req.params;
      let userId = req.user.user_id;
      let todo = await TodoModel.findOne({_id: id, userId: userId});
      if(!todo) throw new ClientError("Todo not found" ,404);
      return res.json(todo)

    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_TODO(req, res) {
    try {
      let {id} = req.params;
      let userID = req.user.user_id;
      let todo = await TodoModel.findOne({_id: id, userId: userID })
      if(!todo) throw new ClientError("Todo not found" ,404);
      todo = req.body;
      return res.json({message: "To do succesfully updated", status: 200, todo})
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_TODO(req, res) {
    try {
      let {id} = req.params;
      let userID = req.user.user_id;
      let todo = await TodoModel.findOne({_id: id, userId: userID })
      if(!todo) throw new ClientError("Todo not found" ,404);
      await TodoModel.deleteOne(todo);
      return res.json({message: "Todo succesfully deleted", status: 200, todo})
    } catch (err) {
      return globalError(err, res);
    }
  },
};

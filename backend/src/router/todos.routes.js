const { Router } = require("express");
const todoController = require("../controller/todo.controller");
const todoRouter = Router()
todoRouter.post("/create",todoController.CREATE_TODO ),
todoRouter.get("/all", todoController.GET_TODOS),
todoRouter.route("/:id")
.get(todoController.GET_TODO)
.delete(todoController.DELETE_TODO)
.put(todoController.UPDATE_TODO)

module.exports = todoRouter
const { Router } = require("express");
const authController = require("../controller/auth.controller");

const authRouter = Router()
authRouter.post("/register", authController.REGISTER )
authRouter.post("/login", authController.LOGIN)
module.exports = authRouter 
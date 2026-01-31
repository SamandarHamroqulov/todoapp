const { globalError, ClientError } = require("shokhijakhon-error-handler");
const UserModel = require("../models/User.model");
let bcrypt = require("bcrypt");
const hashService = require("../lib/hash.service");
const {
  loginValidator,
  registerValidator,
} = require("../utils/user.validator");
const jwtService = require("../lib/jwt.service");
module.exports = {
  async REGISTER(req, res) {
    try {
      let newUser = req.body;
      await registerValidator.validateAsync(newUser);
      const exists = await UserModel.findOne({
        email: req.body.email.toLowerCase().trim(),
      });

      if (exists) {
        throw new ClientError("Email already exists", 400);
      }

      newUser.password = await hashService.hashPassword(newUser.password);
      let insertUser = await UserModel.create(newUser);
      let accesToken = jwtService.createToken({ user_id: insertUser._id });
      return res
        .status(201)
        .json({
          message: "User succesfully registered",
          status: 201,
          accesToken,
        });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async LOGIN(req, res) {
    try {
      let user = req.body;
      await loginValidator.validateAsync(user);
      let findUser = await UserModel.findOne({ email: user.email });
      if (!findUser) throw new ClientError("Unauthorized", 401);
      let checkPassword = await hashService.comparePassword(
        user.password,
        findUser.password,
      );
      if (!checkPassword) throw new ClientError("Unauthorized", 401);
      let accesToken = jwtService.createToken({ user_id: findUser._id });
      return res.json({
        message: "User succesfully logged in",
        status: 200,
        accesToken,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
};

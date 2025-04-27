import { Router } from "express";
import userController from "../controllers/users.controller"
// import { userValidator, loginValidation } from "../middlewares/validation.middleware";
import { checkToken } from "../middlewares/auth.middleware";

let route = Router()
route.get("/users", checkToken, userController.getUsers)
export default route
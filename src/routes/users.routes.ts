import { Router } from "express";
import userController from "../controllers/users.controller"
import { checkToken } from "../middlewares/auth.middleware";

let route = Router()
route.get("/users", checkToken, userController.getUsers)
route.get("/users/:id", checkToken, userController.getById)
route.put("/users/:id", checkToken, userController.updateUser)
route.delete("/users/:id", checkToken, userController.deleteUser)
export default route
import { Router } from "express";
import authController from "../controllers/auth.controller";
import { userValidator, loginValidation } from "../middlewares/validation.middleware";
let route: any = Router()

route.post("/register", userValidator, authController.REGISTER)
route.post("/login", loginValidation, authController.LOGIN)


export default route
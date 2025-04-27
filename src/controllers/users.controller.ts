import { User } from "../models/users.model"
import { errorHandler } from "../utils/error.handler"
import { Request, Response, NextFunction } from "express"

let getUsers = errorHandler(async(req: Request, res: Response) => {
    let users: any = await User.findAll()
    res.status(200).json({message: "Success", users})
})

let getById = errorHandler(async (req: Request, res: Response) => {
	let id = req.params.id
	let user = await User.findOne({ where: { id } })
    if(!user) throw new Error("User not found")
    
	res.status(200).json({ status: 200, message: 'Success', user })
})

export default {
    getUsers,
    getById,
}
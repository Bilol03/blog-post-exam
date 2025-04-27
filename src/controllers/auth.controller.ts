import { errorHandler } from '../utils/error.handler'
import { Request, Response } from 'express'
import { User } from '../models/users.model'
import bcrypt from 'bcryptjs'

let REGISTER = errorHandler(async (req: Request, res: Response) => {
    let body = req.body

    let user = await User.findOne({where: {email: body.email}})
    if(user) throw new Error("Email already exists")

    let salt = process.env.HASH_SALT as string
    body.password = await bcrypt.hash(body.password, +salt)
    console.log(body.password);
    
    let data  = await User.create(body)
    res.status(201).json({ message: "Successfully Registered", data})
})
let LOGIN = errorHandler(async (req: Request, res: Response) => {})

export default {
	REGISTER,
	LOGIN,
}

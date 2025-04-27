import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../utils/error.handler'
import { User } from '../models/users.model'
import jwt from "jsonwebtoken"

let checkToken = errorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token = req.cookies.token
        if (!token) throw new Error("Token is required")
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);

        let user = await User.findOne({where: {email: decoded.email }})
        if(!user) throw new Error("User not found!")

        req.user = user
        next()
        
	},
)

export { checkToken }

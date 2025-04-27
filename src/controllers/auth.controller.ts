import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/users.model'
import { errorHandler } from '../utils/error.handler'

let REGISTER = errorHandler(async (req: Request, res: Response) => {
	let body = req.body

	let user = await User.findOne({ where: { email: body.email } })
	if (user) throw new Error('Email already exists')

	let salt = process.env.HASH_SALT as string
	body.password = await bcrypt.hash(body.password, +salt)
	console.log(body.password)

	let data = await User.create(body)
	res.status(201).json({ message: 'Successfully Registered', data })
})

let LOGIN = errorHandler(async (req: Request, res: Response) => {
	let { email, password } = req.body
	let data: any = await User.findOne({ where: { email } })
	if (!data) throw new Error('User not found')

	let checkPasswd = await bcrypt.compare(password, data.password)
	if (!checkPasswd) throw new Error('Wrong password!')

	interface Payload {
		userId: number
		email: string
	}

	const signToken = (payload: Payload) => {
		const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
			expiresIn: '1d',
		})
		return token
	}
	const payload: Payload = {
		userId: data.id,
		email: data.email,
	}
	const token = signToken(payload)
	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 36000 * 1000,
	})
    
	res.status(200).json({
		status: 200,
		message: 'Successfully Logged In',
		token,
	})
})

export default {
	REGISTER,
	LOGIN,
}

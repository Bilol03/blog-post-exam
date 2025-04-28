import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { User } from '../models/users.model'
import { errorHandler } from '../utils/error.handler'
let getUsers = errorHandler(async (req: Request, res: Response) => {
	let users: any = await User.findAll({ where: { isDeleted: false } })
	res.status(200).json({ message: 'Success', users })
})

let getById = errorHandler(async (req: Request, res: Response) => {
	let id = req.params.id
	let user = await User.findOne({ where: { id } })
	if (!user) throw new Error('User not found')

	res.status(200).json({ status: 200, message: 'Success', user })
})

let updateUser = errorHandler(async (req: Request, res: Response) => {
	let id = req.params.id
	if (req.user.id != id) throw new Error('You are not able to update')
	let body = req.body
	if (body.password) {
		body.password = bcrypt.hash(
			body.password,
			process.env.HASH_SALT as string,
		)
	}

	let [updated] = await User.update(body, { where: { id } })
	if (updated) {
		let updatedUser = await User.findOne({ where: { id } })
		res.status(200).json({ message: 'Successfully updated', updatedUser })
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})

export default {
	getUsers,
	getById,
	updateUser,
}

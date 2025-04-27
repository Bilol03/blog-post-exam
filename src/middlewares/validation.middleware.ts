import { errorHandler } from '../utils/error.handler'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

let userValidator = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const createUserSchema = Joi.object({
		name: Joi.string().required().messages({
			'string.base': 'Name must be a string',
			'any.required': 'Name is required',
		}),
		last_name: Joi.string().optional().messages({
			'string.base': 'Last name must be a string',
		}),
		email: Joi.string().email().required().messages({
			'string.email': 'Email must be valid',
			'any.required': 'Email is required',
		}),
		password: Joi.string().min(6).required().messages({
			'string.min': 'Password must be at least 6 characters long',
			'any.required': 'Password is required',
		}),
	})

	await createUserSchema.validateAsync(req.body, { abortEarly: false })
	next()
})

let loginValidation = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const UserLoginSchema = Joi.object({
		email: Joi.string().email().max(200).required().messages({
			'string.base': `"email" must be a string`,
			'string.email': `"email" must be a valid email`,
			'string.empty': `"email" cannot be empty`,
			'string.max': `"email" must be at most 200 characters`,
			'any.required': `"email" is required`,
		}),

		password: Joi.string().min(6).max(100).required().messages({
			'string.base': `"password" must be a string`,
			'string.empty': `"password" cannot be empty`,
			'string.min': `"password" should have at least 6 characters`,
			'string.max': `"password" should not exceed 100 characters`,
			'any.required': `"password" is required`,
		}),
	})
	await UserLoginSchema.validateAsync(req.body, { abortEarly: false })
	next()
})

export { loginValidation, userValidator }

import { errorHandler } from '../utils/error.handler.js'
import { Response, } from 'express'
errorHandler.default

let errController = (error: any, res: Response ) => {
	res.status(404).json({ status: 'Failed', message: error.message })
}

export { errController }
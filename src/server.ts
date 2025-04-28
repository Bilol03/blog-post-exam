import { errController } from './controllers/error.controller'
import { sequelize } from './config/db.config'
import userRouter from "./routes/users.routes"
import blogRouter from "./routes/blogs.routes"
import authRouter from './routes/auth.routes'
import express, { Response } from 'express'
import cookieParser from 'cookie-parser'
import "./models/relationships.model"
import { config } from 'dotenv'

config()
let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

;(async () => {
	await sequelize.sync()
	console.log('Connected to DB*')
})()

app.use('/auth', authRouter)
app.use(userRouter)
app.use("/blog", blogRouter)

app.use(errController)
app.use((err: any, res: Response) => {
	const status = err.status || 500
	console.log(status)

	res.status(status).json({
		error: {
			message: err.message || 'Internal Server Error',
			status: status,
		},
	})
})
process.on('unhandledRejection', (err: any) => {
	console.log('UNHANDLED REJECTION 💥')

	console.log(err.name, err.message)
	// process.exit(1);
})

// Unhandled Excpections
process.on('uncaughtException', (err) => {
	console.log('UNHANDLED Excpections 💥')
	console.log(err.name, err.message)
	// process.exit(1);
})
app.listen(3000, () => console.log('This server is running on', 3000))

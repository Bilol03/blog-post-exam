import express from 'express'
import { config } from 'dotenv'

config()
let app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((err, req, res, next) => {
	const status = err.status || 500
	console.log(status)

	res.status(status).json({
		error: {
			message: err.message || 'Internal Server Error',
			status: status,
		},
	})
})
process.on('unhandledRejection', (err) => {
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

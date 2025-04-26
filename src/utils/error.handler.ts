let errorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.log(err)
            res.status(400).json({message: "Error: " + err.message})
        })
    }
}


let authErrorHandler = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => {
			console.log(err)
            res.status(401).json({message: "Error: " + err.message})
		})
	}
}
export { errorHandler, authErrorHandler }
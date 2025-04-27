import { Request, Response, NextFunction } from "express"
let errorHandler = (func: any): any => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: any): void => {
            console.log(err)
            res.status(400).json({message: "Error: " + err.message})
        })
    }
}


let authErrorHandler = (func: any): any => {
	return (req: Request, res: Response, next: NextFunction) => {
		func(req, res, next).catch((err: any): void => {
			console.log(err)
            res.status(401).json({message: "Error: " + err.message})
		})
	}
}
export { errorHandler, authErrorHandler }
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error.handler";
import { BlogUser } from "../models/blog_user.model";

let checkRole = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    let blogId = req.params.id
    let userId = req.user.id

    let blogUser:any = await BlogUser.findOne({where: {blog_id: blogId, user_id: userId}})
    if (!blogUser) req.user = null
    if(blogUser.role != 'owner') req.user = null
    
    next()
})

export {checkRole}
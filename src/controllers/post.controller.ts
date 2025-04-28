import { errorHandler } from "../utils/error.handler"
import { Post } from "../models/post.models"
import { Request, Response } from "express"


let createPost = errorHandler(async (req: Request, res: Response) => {
    let body = req.body
    if(!body.title || !body.body) throw new Error("Title or Body is required")
    if(!req.user) throw new Error("You are not able to write post to this blog")
    
    let obj = {
        title: body.title,
        body: body.body,
        blog_id: +req.params.id,
        user_id: +req.user.id
    }
    let post = await Post.create(obj)

    res.status(200).json({message: "Successfully posted", post})


})
let getById = errorHandler(async (req: Request, res: Response) => {})
let updatePost = errorHandler(async (req: Request, res: Response) => {})
let deletePost = errorHandler(async (req: Request, res: Response) => {})
let sortPost = errorHandler(async (req: Request, res: Response) => {})
let getPostComments = errorHandler(async (req: Request, res: Response) => {})

export default {
    createPost,
    getById,
    updatePost,
    deletePost,
    sortPost,
    getPostComments,
}
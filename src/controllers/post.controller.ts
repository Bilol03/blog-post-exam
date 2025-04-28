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
let getById = errorHandler(async (req: Request, res: Response) => {
   let id = req.params.id
   
   let post = await Post.findOne({where: {id}})
   res.status(200).json({message: "Success", post})
})

let updatePost = errorHandler(async (req: Request, res: Response) => {
    let user_id = req.user.id
    let id = req.params.id
    let body = req.body

    let [updated] = await Post.update(body, {where: {id, user_id}})
    if(!updated) throw new Error("Post not updated")
    let data = await Post.findOne({where: {id}})
    res.status(200).json({message: "Successfully updated", data})
})
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
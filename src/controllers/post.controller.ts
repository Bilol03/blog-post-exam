import { Request, Response } from 'express'
import { Post } from '../models/post.models'
import { errorHandler } from '../utils/error.handler'
import { Blog } from '../models/blogs.models'
import { User } from '../models/users.model'
import { Comment } from '../models/comments.model'

let createPost = errorHandler(async (req: Request, res: Response) => {
	let body = req.body
	if (!body.title || !body.body) throw new Error('Title or Body is required')
	if (!req.user)
		throw new Error('You are not able to write post to this blog')

	let obj = {
		title: body.title,
		body: body.body,
		blog_id: +req.params.id,
		user_id: +req.user.id,
	}
	let post = await Post.create(obj)

	res.status(200).json({ message: 'Successfully posted', post })
})
let getById = errorHandler(async (req: Request, res: Response) => {
	let id = req.params.id

	let post = await Post.findOne({ where: { id } })
	res.status(200).json({ message: 'Success', post })
})

let updatePost = errorHandler(async (req: Request, res: Response) => {
	let user_id = req.user.id
	let id = req.params.id
	let body = req.body

	let [updated] = await Post.update(body, { where: { id, user_id } })
	if (!updated) throw new Error('Post not updated')
	let data = await Post.findOne({ where: { id } })
	res.status(200).json({ message: 'Successfully updated', data })
})

let deletePost = errorHandler(async (req: Request, res: Response) => {
    let isDeleted: any = await Post.findOne({where: {id: req.params.id, user_id: req.user.id}})

    if(!isDeleted) throw new Error("Post not foud or you are not able to delete")
    if(isDeleted.isDeleted == true) throw new Error("This post already deleted")

	let [deleted] = await Post.update(
		{ isDeleted: true },
		{ where: { id: req.params.id } },
	)
    res.status(200).json({message: "Successfully deleted"})
    
    
    
})
let sortPost = errorHandler(async (req: Request, res: Response) => {


    const posts = await Post.findAll({
      where: {  isDeleted: false }, 
      order: [['createdAt', 'DESC']],  
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
      ],
    });

    res.status(200).json(posts);
})
let getPostComments = errorHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: 'post_id is required' });
    }

    const comments = await Comment.findAll({
      where: { post_id: postId },
      order: [['createdAt', 'DESC']], 
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
      ]
    });

    res.status(200).json(comments);
})

export default {
	createPost,
	getById,
	updatePost,
	deletePost,
	sortPost,
	getPostComments,
}

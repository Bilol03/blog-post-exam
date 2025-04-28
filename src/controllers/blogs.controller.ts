import { Request, Response } from 'express'
import { BlogUser } from '../models/blog_user.model'
import { Blog } from '../models/blogs.models'
import { errorHandler } from '../utils/error.handler'

let createBlog = errorHandler(async (req: Request, res: Response) => {
	let body: any = req.body
	if (!body.title) throw new Error('title is required')
	let data = await Blog.findOne({ where: { title: body.title } })
	if (data) throw new Error('This title is exists, Please choose another one')
	let blog: any = await Blog.create(body)
	let obj = {
		user_id: req.user.id,
		blog_id: blog.id,
		role: 'owner',
	}
	let blogUser = await BlogUser.create(obj)
	const blogData = blog.toJSON()

	delete blogData.isDeleted
	res.status(201).json({ message: 'Succes', blogData })
})

let getMyBlogs = errorHandler(async (req: Request, res: Response) => {
	let blogUsers = await BlogUser.findAll({
        attributes: ['user_id'],
		where: { user_id: req.user.id, role: 'owner' },
		include: [{ model: Blog, as: 'blog', where: { isDeleted: false } }],
	})
	res.status(200).json({ message: 'Success', blogUsers })
})

export default {
	createBlog,
	getMyBlogs,
}

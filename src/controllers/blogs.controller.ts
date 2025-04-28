import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { BlogUser } from '../models/blog_user.model'
import { Blog } from '../models/blogs.models'
import { User } from '../models/users.model'
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

let getMyJoinedBlogs = errorHandler(async (req: Request, res: Response) => {})
let getBlogInfo = errorHandler(async (req: Request, res: Response) => {
	let id = req.params.id
	let blog = await BlogUser.findOne({
		where: { blog_id: id },
		attributes: ['id', 'role'],
		include: [
			{ model: Blog, as: 'blog', where: { isDeleted: false } },
			{ model: User, as: 'user', where: { isDeleted: false } },
		],
	})
	res.status(200).json({ message: 'Success', blog })
})

let updateBlog = errorHandler(async (req: Request, res: Response) => {
	if (req.user == null) throw new Error('You are unable to update')
	let [updated] = await Blog.update(req.body, {
		where: { id: req.params.id },
	})
	if (updated) {
		let blog = await Blog.findOne({ where: { id: req.params.id } })
		res.status(200).json({ message: 'Success', blog })
	} else {
		throw new Error('Blog not updated')
	}
})

let deleteBlog = errorHandler(async (req: Request, res: Response) => {
	if (req.user == null) throw new Error('You are unable to delete')

	let id = req.params.id
	await Blog.update({ isDeleted: true }, { where: { id } })

	res.status(200).json({ message: 'Successfully deleted' })
})

let searchBlog = errorHandler(async (req: Request, res: Response) => {
	let blog_name = req.query.title
	const page = Number(req.query.page) || 1
	const limit = 10
	const offset = (page - 1) * limit

	console.log(blog_name)

	const blog = await Blog.findAll({
		where: {
			title: {
				[Op.iLike]: blog_name,
			},
		},
		limit,
		offset,
	})

	if (!blog) throw new Error('Blog not found')
	res.status(200).json({ message: 'Success', blog })
})

export default {
	createBlog,
	getMyBlogs,
	getMyJoinedBlogs,
	getBlogInfo,
	updateBlog,
	deleteBlog,
	searchBlog,
}

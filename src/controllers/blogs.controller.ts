import { errorHandler } from '../utils/error.handler'
import { Blog } from '../models/blogs.models'
import { BlogUser } from '../models/blog_user.model'
import { Request, Response } from 'express'

let createBlog = errorHandler(async (req: Request, res: Response) => {
	let body: any = req.body
	if (!body.title) throw new Error('title is required')
    let data = await Blog.findOne({where: { title: body.title }})
    if(data) throw new Error("This title is exists, Please choose another one")
    let blog: any = await Blog.create(body)
    let obj = {
        user_id : req.user.id,
        blog_id: blog.id,
        role: "owner"
    }
    let blogUser = await BlogUser.create(obj)
    const blogData = blog.toJSON(); // Sequelize instance => plain object

    delete blogData.isDeleted;
    res.status(201).json({message: "Succes", blogData})
    
    

})

export default {
	createBlog,
}

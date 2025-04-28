import { checkToken } from '../middlewares/auth.middleware'
import blogController from "../controllers/blogs.controller"
import { Router } from 'express'

let route = Router()
/*
    /get-my-joined-blogs - Bloglarni olish. O’zi a’zo bo’lgan
    /get-blog-info - Idsi bo’yicha blog haqida batafsil ma’lumot.
    /update - Update qilish. Faqat o’zi yaratganini update qilolsin
    /delete - o’chirish. Faqat o’zini blogini o’chirolishi kerak.
    /search - blog ismi  bilan global qidirish. Barcha bloglarni ichidan.
    /join-blog - Blogga a’zo bo’lish.
    /leave-blog - Blogdan chiqib ketish.
    /get-users - Blog a’zolarini olish.

*/

route.post("/create", checkToken, blogController.createBlog)
route.get('/get-my-blogs', checkToken, blogController.getMyBlogs)
route.get('/get-my-joined-blogs', checkToken, blogController.getMyJoinedBlogs)
route.get('/get-blog-info/:id', blogController.getBlogInfo)
route.get('/update/:id', checkToken, blogController.updateBlog)

export default route

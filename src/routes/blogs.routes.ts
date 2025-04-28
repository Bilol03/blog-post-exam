import { checkToken } from '../middlewares/auth.middleware'
import blogController from "../controllers/blogs.controller"
import { checkRole } from '../middlewares/roles.middleware'
import { Router } from 'express'

let route = Router()


route.post("/create", checkToken, blogController.createBlog)
route.get('/get-my-blogs', checkToken, blogController.getMyBlogs)
route.get('/get-my-joined-blogs', checkToken, blogController.getMyJoinedBlogs)
route.get('/get-blog-info/:id', blogController.getBlogInfo)
route.put('/update/:id', checkToken, checkRole, blogController.updateBlog)
route.delete('/delete/:id', checkToken, checkRole, blogController.deleteBlog)
route.get("/search", checkToken, blogController.searchBlog)
route.post("/join-blog/:id", checkToken, blogController.joinBlog)
route.post("/leave-blog/:id", checkToken, blogController.leaveBlog)
route.get("/get-users/:id", checkToken, checkRole, blogController.getMembers)

export default route

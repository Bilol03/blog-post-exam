import { Router } from 'express'
import postController from '../controllers/post.controller'
import { checkToken } from '../middlewares/auth.middleware'
import { checkRole } from '../middlewares/roles.middleware'

let route = Router()

/*
/create - Blog egasi post qila olishi mumkin.
	/get-all - Blogning barcha postlarini olish. Blog idsi bo’yicha.
	/get-by-id . Postni idsi bo’yicha olish. Har get bo’lganda view 1 taga oshirilishi kerak.
	/update - Update qilish. Blog egasi qila oladi.
	/delete - Delete qilish. Blog egasi qila oladi.
	/sort-by-date - eng oxirgilari bo’yicha sort qilish. Blog idsi orqali olinadi.
	/:post_id/get-comments - Postga yozilgan izohlar.
    */

route.post('/:id/create', checkToken, checkRole, postController.createPost)
route.get('/get-by-id/:id', postController.getById)
route.put('/update/:id', checkToken, postController.updatePost)
route.delete('/deleted/:id', checkToken, postController.deletePost)
route.get('/sort-by-date', checkToken, postController.sortPost)
route.get('/:post-id/comments', postController.getPostComments)

export default route

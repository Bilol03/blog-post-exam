import { Router } from 'express'
import postController from '../controllers/post.controller'
import { checkToken } from '../middlewares/auth.middleware'
import { checkRole } from '../middlewares/roles.middleware'

let route = Router()


route.post('/:id/create', checkToken, checkRole, postController.createPost)
route.get('/get-by-id/:id', postController.getById)
route.put('/update/:id', checkToken, postController.updatePost)
route.delete('/delete/:id', checkToken, postController.deletePost)
route.get('/sort-by-date', checkToken, postController.sortPost)
route.get('/:postId/comments', postController.getPostComments)

export default route

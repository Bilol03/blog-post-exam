import { Router } from 'express'
import commentController from '../controllers/comments.controller'
import { checkToken } from '../middlewares/auth.middleware'
import { checkRole } from '../middlewares/roles.middleware'

let route = Router()

route.post('/create/:postId', checkToken,  commentController.createComment);
route.put('/update/:id', checkToken,  commentController.updateComment);
route.delete('/delete/:id', checkToken,  commentController.deleteComment);
export default route


import { errorHandler } from "../utils/error.handler"
import { Request, Response } from "express"
import { Comment } from '../models/comments.model'


let createComment = errorHandler( async (req: Request, res: Response) => {
    const { postId } = req.params;
    const body = req.body
    if (!postId) {
        return res.status(400).json({ message: 'post_id is required' });
    }
    if(!body.comment) throw new Error("Comment is required")

    const comment = await Comment.create({
      post_id: postId,
      user_id: req.user.id,
      comment: body.comment,
    });

    res.status(201).json(comment);
})
let updateComment = errorHandler( async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'comment is required' });
    }
    
    const data:any = await Comment.findByPk(id);
    if(data.user_id != req.user.id) throw new Error("You are not able to update")
    if (!data) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await data.update({ comment });

    res.status(200).json({message: "Success", comment: comment});
 
})
let deleteComment = errorHandler( async (req: Request, res: Response) => {})

export default {
    createComment,
    updateComment,
    deleteComment,
}
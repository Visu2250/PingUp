import express from 'express';
import {protect} from '../middlewares/auth.js'
import {upload} from '../config/multer.js'
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';
const postRouter=express.Router()

postRouter.post('/add', upload.array('images',4),protect, addPost)
postRouter.get('/feed',protect, getFeedPosts)
postRouter.post('/feed',protect, likePost)
export default postRouter

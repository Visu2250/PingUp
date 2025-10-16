import express from 'express';
import {upload } from '../config/multer.js';
import { protect } from '../middlewares/auth.js';
import { addUserStroy, getStories } from '../controllers/storyController.js';



const storyRouter=express.Router()

storyRouter.post('/create', upload.single('media'), protect, addUserStroy)
storyRouter.get('/get',protect,getStories)
export default storyRouter
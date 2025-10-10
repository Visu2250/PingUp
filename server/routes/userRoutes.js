import express from "express";
import {
  acceptConnectionRequest,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  sendConnectionRequest,
  unfollowUser,
  updateUserData,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover" },
  ]),
  protect,
  updateUserData
);

userRouter.get("/discover", protect, discoverUsers);
userRouter.get("/follow", protect, followUser);
userRouter.get("/unfollow", protect, unfollowUser);
userRouter.post("/connect", protect, sendConnectionRequest)
userRouter.post("/accept", protect, acceptConnectionRequest)
userRouter.get('/connections', protect, getUserConnections)



export default userRouter;

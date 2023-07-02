import express from "express";
import {
  getUserPosts,
  getFeedPosts,
  likePost,
} from "../controllers/PostController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.patch("/:id", verifyToken, likePost);
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch("/:id/like", verifyToken, likePost);

export default router;

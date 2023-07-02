import Post from "../models/Post.js";
import User from "../models/User.js";

export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(202).json({ posts: allPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const findUser = User.findById(userId);

    if (!findUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const userPosts = await Post.find({ userId: userId });
    res.status(200).json({ userPosts: userPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    let post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    const isLike = post.likes.get(userId);

    if (isLike) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({ message: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    if (!userId || !description || !picturePath) {
      return res.status(404).json({ message: "data is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    res.status(201).json({ message: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

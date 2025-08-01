import { Request, Response, RequestHandler } from 'express';
import Blog, { IBlog } from '../models/Blog';
import { Types } from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: {
    userID: string;
  };
}

// ✅ Create Blog
export const createBlog: RequestHandler = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  if (!userReq.user?.userID) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  try {
    const blog = new Blog({
      ...req.body,
      authorId: userReq.user.userID,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Related Blogs
export const getRelatedBlogs: RequestHandler = async (req, res) => {
  const { category, excludeId } = req.query;

  try {
    const relatedBlogs = await Blog.find({
      category,
      _id: { $ne: excludeId },
    }).limit(4);

    res.status(200).json(relatedBlogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Blogs
export const getAllBlogs: RequestHandler = async (_req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Blog by ID
export const getBlogById: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('authorId', 'name');

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get User Blogs
export const getUserBlogs: RequestHandler = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  console.log('User ID:', userReq.user);
  if (!userReq.user?.userID) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  try {
    const blogs = await Blog.find({ authorId: userReq.user.userID
     });
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch user's blogs" });
  }
};

// ✅ Update Blog
export const updateBlog: RequestHandler = async (req, res) => {
  try {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('authorId', 'name');

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Blog
export const deleteBlog: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete All Blogs
export const deleteAllBlogs: RequestHandler = async (_req, res) => {
  try {
    const result = await Blog.deleteMany({});
    res.json({ message: `${result.deletedCount} blogs deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Most Viewed Blogs
export const getMostViewedBlogs: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const blogs = await Blog.find()
      .sort({ views: -1 })
      .limit(limit)
      .populate('authorId', 'name');

    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Most Recent Blogs
export const getMostRecentBlogs: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const blogs = await Blog.find()
      .sort({ date: -1 })
      .limit(limit)
      .populate('authorId', 'name');

    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
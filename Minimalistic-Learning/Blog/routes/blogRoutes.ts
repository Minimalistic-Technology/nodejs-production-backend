import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  getRelatedBlogs,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
  getMostViewedBlogs,
  getMostRecentBlogs,
} from '../controllers/blogController';
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

// Route order matters — place more specific routes first
router.get('/related', getRelatedBlogs);
router.get('/my-blogs', authenticateToken, getUserBlogs);
router.post('/create', authenticateToken, createBlog);
router.get('/', getAllBlogs);
router.get('/most-viewed', getMostViewedBlogs);
router.get('/most-recent', getMostRecentBlogs);
router.get('/:id', getBlogById);
router.put('/update/:id', authenticateToken, updateBlog);
router.delete('/delete', deleteAllBlogs);
router.delete('/delete/:id', authenticateToken, deleteBlog);

export default router;

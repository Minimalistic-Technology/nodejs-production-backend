import express from 'express';
import BookController from '../controllers/homepageController';
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getApprovedReviewsByBookId,
} from '../controllers/reviewController';
import BookRequestController from '../controllers/addbookController';

const router = express.Router();

router.get('/book-categories', BookController.getAllCategories);
router.post('/book-categories', BookController.createCategory);
router.get('/book-categories/:path*', BookController.getCategoryByPath);
router.put('/book-categories/:path*', BookController.updateCategory);
router.delete('/book-categories/:path*', BookController.deleteCategory);
router.post('/book-categories/:path*/tags', BookController.createTag);
router.delete('/book-categories/:path*/tags/:tagName', BookController.deleteTag);

router.get('/books/:bookId([0-9a-fA-F]{24})', BookController.getBookById);
router.delete('/books/:bookId([0-9a-fA-F]{24})', BookController.deleteBook);
router.put('/books/:path*/:bookId([0-9a-fA-F]{24})', BookController.updateBook);

router.post('/books/:path*', BookController.createBook);
router.get('/books/:path*', BookController.getBooksByCategoryPath);

router.delete('/book-categories', BookController.deleteAllCategories);
router.delete('/books', BookController.deleteAllBooks);

router.get('/reviews', getReviews);
router.get('/reviews/book/:bookId', getApprovedReviewsByBookId);
router.post('/reviews', createReview);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

router.post('/book-requests', BookRequestController.createBookRequest);
router.get('/book-requests', BookRequestController.getBookRequests);

export default router;
import express from 'express';
import {
  getLatestQuotes,
  createQuote,
  deleteQuote
} from '../controllers/quoteBlogController';

const router = express.Router();

router.get('/latest', getLatestQuotes);
router.post('/create', createQuote);
router.delete('/delete/:id', deleteQuote);

export default router;

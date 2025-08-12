import express from 'express';
import { bulkCreateUser, signup, login } from '../controllers/usercontroller';

const router = express.Router();

router.post('/users/bulk', bulkCreateUser); 
router.post('/signup', signup);
router.post('/login', login);

export default router;
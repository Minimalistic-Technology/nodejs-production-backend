import express, { Router } from 'express';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authController.getUser);

export default router;

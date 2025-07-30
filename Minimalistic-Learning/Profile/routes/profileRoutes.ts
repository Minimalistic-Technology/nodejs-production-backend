import express from 'express';
import {
  createProfile,
  getProfile,
  updateProfile
} from '../controllers/profileController';

const router = express.Router();

router.post('/create', createProfile);
router.get('/', getProfile);
router.put('/update', updateProfile);

export default router;

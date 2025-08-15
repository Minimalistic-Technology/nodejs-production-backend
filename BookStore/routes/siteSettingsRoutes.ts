import express from 'express';
import {
  createSettings,
  getSettings,
  updateSettings,
  deleteSettings
} from '../controllers/siteSettingsController';

const router = express.Router();

router.post('/settings', createSettings);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);
router.delete('/settings', deleteSettings);

export default router;
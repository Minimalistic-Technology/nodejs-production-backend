import express from 'express';
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';

const router = express.Router();

router.post('/properties', createProperty);
router.get('/properties', getProperties);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);

export default router;

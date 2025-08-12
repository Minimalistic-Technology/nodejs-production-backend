import express from 'express';
import {
  createPropertyRequirement,
  getPropertyRequirements,
  getPropertyRequirementById,
  updatePropertyRequirement,
  deletePropertyRequirement
} from '../controllers/propertyRequirementController';

const router = express.Router();

router.post('/property-requirements', createPropertyRequirement);
router.get('/property-requirements', getPropertyRequirements);
router.get('/property-requirements/:id', getPropertyRequirementById);
router.put('/property-requirements/:id', updatePropertyRequirement);
router.delete('/property-requirements/:id', deletePropertyRequirement);

export default router;

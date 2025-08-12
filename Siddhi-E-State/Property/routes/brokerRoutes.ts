import express from 'express';
import {
  createBroker,
  getBrokers,
  getBrokerById,
  updateBroker,
  deleteBroker
} from '../controllers/brokerController';

const router = express.Router();

router.post('/brokers', createBroker);
router.get('/brokers', getBrokers);
router.get('/brokers/:id', getBrokerById);
router.put('/brokers/:id', updateBroker);
router.delete('/brokers/:id', deleteBroker);

export default router;

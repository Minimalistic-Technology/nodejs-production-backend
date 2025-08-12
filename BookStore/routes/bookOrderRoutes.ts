// File: orderroutes.ts
import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus, deleteOrder, getCancelReasons, cancelOrder } from '../controllers/ordercontroller';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);
router.get('/cancel-reasons', getCancelReasons);
router.post('/orders/:id/cancel', cancelOrder);

export default router;
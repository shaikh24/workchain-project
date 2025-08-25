import { Router } from 'express';
import { createPayment, paymentStatus } from '../controllers/payments.js';
const r = Router();
r.post('/create', createPayment);
r.get('/:id', paymentStatus);
export default r;

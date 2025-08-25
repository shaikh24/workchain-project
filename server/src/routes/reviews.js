import { Router } from 'express';
import { addReview } from '../controllers/reviews.js';
import { authRequired } from '../utils/auth.js';
const r = Router();
r.post('/', authRequired, addReview);
export default r;

import { Router } from 'express';
import { me, update } from '../controllers/users.js';
import { authRequired } from '../utils/auth.js';
const r = Router();
r.get('/me', authRequired, me);
r.put('/me', authRequired, update);
export default r;

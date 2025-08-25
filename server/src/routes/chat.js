import { Router } from 'express';
import { history } from '../controllers/chat.js';
import { authRequired } from '../utils/auth.js';
const r = Router();
r.get('/:room', authRequired, history);
export default r;

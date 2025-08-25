import { Router } from 'express';
import { list, create } from '../controllers/jobs.js';
import { authRequired } from '../utils/auth.js';
const r = Router();
r.get('/', list);
r.post('/', authRequired, create);
export default r;

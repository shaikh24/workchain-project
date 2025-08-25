import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function signup(req, res){
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ ok:false, error:'Missing fields' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash, role });
    res.json({ ok:true, user:{ id:user._id, username:user.username, email:user.email } });
  } catch (e) {
    res.status(400).json({ ok:false, error:e.message });
  }
}

export async function login(req, res){
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ ok:false, error:'User not found' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ ok:false, error:'Invalid credentials' });
    const token = jwt.sign({ id:user._id, username:user.username, role:user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.json({ ok:true, token, user:{ id:user._id, username:user.username, role:user.role } });
  } catch (e) {
    res.status(500).json({ ok:false, error:e.message });
  }
}

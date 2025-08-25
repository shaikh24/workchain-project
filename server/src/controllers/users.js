import User from '../models/User.js';

export async function me(req, res){
  const user = await User.findById(req.user.id);
  res.json({ ok:true, user });
}

export async function update(req, res){
  const { interests, country, walletAddress, premium } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { interests, country, walletAddress, premium }, { new:true });
  res.json({ ok:true, user });
}

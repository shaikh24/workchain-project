import Job from '../models/Job.js';

export async function list(req, res){
  const { q, category, type, mode, country, status } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (type) filter.type = type;
  if (mode) filter.mode = mode;
  if (status) filter.status = status;
  if (q) filter.title = { $regex: q, $options:'i' };
  const jobs = await Job.find(filter).sort({ createdAt:-1 }).limit(200);
  res.json({ ok:true, jobs });
}

export async function create(req, res){
  const { title, description, category, type, mode, budget } = req.body;
  const job = await Job.create({ title, description, category, type, mode, budget, client: req.user.id });
  res.json({ ok:true, job });
}

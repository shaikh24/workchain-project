import Review from '../models/Review.js';

export async function addReview(req, res){
  const { target, job, rating, comment } = req.body;
  const r = await Review.create({ reviewer: req.user.id, target, job, rating, comment });
  res.json({ ok:true, review:r });
}

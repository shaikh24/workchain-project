import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  target: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  job: { type: mongoose.Schema.Types.ObjectId, ref:'Job' },
  rating: Number,
  comment: String
},{ timestamps:true });
export default mongoose.model('Review', ReviewSchema);

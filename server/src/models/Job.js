import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema({
  title:String,
  description:String,
  category:String,
  type: { type:String, enum:['online','offline'] },
  mode: { type:String, enum:['remote','physical'] },
  budget: Number,
  currency: { type:String, default:'PI' },
  client: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  status: { type:String, enum:['open','assigned','completed','cancelled'], default:'open' }
},{ timestamps:true });
export default mongoose.model('Job', JobSchema);

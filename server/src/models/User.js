import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username: { type:String, unique:true },
  email: { type:String, unique:true },
  passwordHash: String,
  role: { type:String, enum:['client','freelancer','both'], default:'both' },
  interests: [String],
  country: String,
  rating: { type:Number, default: 5 },
  walletAddress: String,
  premium: { type:Boolean, default:false }
},{ timestamps:true });
export default mongoose.model('User', UserSchema);

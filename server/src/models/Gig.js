import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: String,
  rating: Number,
  projects: Number,
  seller: {
    name: String,
    profilePic: String,
    completed: Number,
    reviews: [
      { user: String, text: String, rating: Number }
    ]
  },
  images: [String],
});

const Gig = mongoose.model("Gig", gigSchema);
export default Gig;

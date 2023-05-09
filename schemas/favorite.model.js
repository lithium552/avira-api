import mongoose, { Schema as _Schema } from 'mongoose';
const Schema  = _Schema;

const favoriteSchema = new Schema({
  userId: {type: String, required: true}, 
  items: [String]
});

export const Favorite = mongoose.model('favorite', favoriteSchema)
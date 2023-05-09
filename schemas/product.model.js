import mongoose, { Schema as _Schema } from 'mongoose';
const Schema  = _Schema;

export const productSchema = new Schema({
  title: String, 
  desc: String,
  oldPrice: Number,
  newPrice: Number,
  img: String,
  isFavorite: Boolean,
  rating: Number
});

export const Product = mongoose.model('all', productSchema)
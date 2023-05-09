import mongoose, { Schema as _Schema } from 'mongoose';
const Schema  = _Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true}, 
  password: {type: String, required: true}
});

export const User = mongoose.model('user', userSchema)
import mongoose, { Schema as _Schema } from 'mongoose';
const Schema  = _Schema;

export const addressSchema = new Schema({
    id: String,
    userId: String,
    name: String,
    surname: String,
    street: String,
    city: String,
    index: String,
    phone: String,
    isOffice: Boolean,
    isHome: Boolean,
});

export const Address = mongoose.model('address', addressSchema)


import mongoose, { Schema as _Schema } from 'mongoose';
import { addressSchema } from './address.model.js';
import { productSchema } from './product.model.js';
const Schema  = _Schema;

const orderSchema = new Schema({
    userId: String,
    address: addressSchema,
    paymentMethod: String,
    items: [productSchema]
});

export const Order = mongoose.model('order', orderSchema)


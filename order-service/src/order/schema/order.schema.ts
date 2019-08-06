import * as mongoose from 'mongoose';
import { STATES } from '../constant/order.constant';

export const OrderSchema = new mongoose.Schema({
  state: { type: String, default: STATES.CREATED },
  article: String,
  quantity: Number,
  price: Number,
  options: String,
});

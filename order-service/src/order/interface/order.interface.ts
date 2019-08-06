import { Document } from 'mongoose';

export interface Order extends Document {
  state: string;
  article: string;
  quantity: number;
  price: number;
  options: string;
}

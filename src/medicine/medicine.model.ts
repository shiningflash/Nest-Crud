import * as mongoose from 'mongoose';

export const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {type: Number, required: true },
});

export interface Medicine extends mongoose.Document {
    id: string;
    name: string;
    brand: string;
    price: number;
}
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
});

export interface User extends mongoose.Document {
    email: string;
    username: string;
}
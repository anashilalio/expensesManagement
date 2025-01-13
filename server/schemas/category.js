import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const Category = mongoose.model('Category', categorySchema, 'Categories');
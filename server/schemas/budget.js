import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  maxAmount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  currentAmount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

export const Budget = mongoose.model('Budget', budgetSchema, 'Budgets');
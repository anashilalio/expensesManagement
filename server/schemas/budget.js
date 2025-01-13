import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true
  }
});

export const Budget = mongoose.model('Budget', budgetSchema, 'Budgets');
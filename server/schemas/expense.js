import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true 
  },
  category: { 
    type: mongoose.Schema.Types.String,
    required: true 
  },
  description : {
    type : mongoose.Schema.Types.String,
    required: false
  },
  amount: { 
    type: mongoose.Schema.Types.Number,
    required: true 
  },
  date: { 
    type: mongoose.Schema.Types.String,
    required: true
  }
});

export const Expense = mongoose.model('Expense', expenseSchema, 'Expenses');
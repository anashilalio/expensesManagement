import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
  category: { 
    type: mongoose.Schema.Types.String,
    required: true 
  },
  amount: { 
    type: mongoose.Schema.Types.Number,
    required: true 
  },
  name : {
    type : mongoose.Schema.Types.String,
    required: false
  },
  date: { 
    type: mongoose.Schema.Types.String,
    required: true
  }
});

export const Expense = mongoose.model('Expense', expenseSchema, 'Expenses');
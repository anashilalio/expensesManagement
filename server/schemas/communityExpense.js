import mongoose, { Schema } from "mongoose";

const communityExpenseSchema = new Schema({
  communityCode: {
    type: mongoose.Schema.Types.String,
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

export const CommunityExpense = mongoose.model('CommunityExpense', communityExpenseSchema, 'CommunitiesExpenses');
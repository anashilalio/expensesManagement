import mongoose, { Schema } from "mongoose";

const communityBudgetSchema = new Schema({
    communityCode: {
        type: mongoose.Schema.Types.String,
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

export const CommunityBudget = mongoose.model('CommunityBudget', communityBudgetSchema, 'CommunitiesBudgets');
import mongoose, { Schema } from "mongoose";

const communityCategory = new Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  communityCode: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  color: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

export const CommunityCategory = mongoose.model('CommunityCategory', communityCategory, 'CommunitiesCategories');
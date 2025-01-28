import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const communitySchema = new Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String
  },
  code: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
});

communitySchema.pre('save', function (next) {
  
  if(!this.code)
    this.code = uuidv4();

  next();

});


export const Community = mongoose.model('Community', communitySchema, 'Communities');
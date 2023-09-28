import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Prompt
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Prompt on the backend
export type Prompt = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  date: string; 
  promptText: string;
};

const PromptSchema = new Schema({
  // The user's username
  date: {
    type: String,
    required: true
  },
  promptText: {
    type: String,
    required: true
  },
});

const PromptModel = model<Prompt>('Prompt', PromptSchema);
export default PromptModel;

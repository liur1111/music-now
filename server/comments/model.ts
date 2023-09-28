import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type { User } from '../user/model';

/**
 * This file defines the properties stored in a Comment
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Comment on the backend
export type Comment = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  mixtapeId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

export type PopulatedComment = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  mixtapeId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Comments stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const CommentSchema = new Schema<Comment>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The mixtape that a user is leaving their comment
  mixtapeId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the comment was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the comment
  content: {
    type: String,
    required: true
  },
  // The date the comment was modified
  dateModified: {
    type: Date,
    required: true
  }
});

const CommentModel = model<Comment>('Comment', CommentSchema);
export default CommentModel;

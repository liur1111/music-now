import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Like
 */

export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  mixtapeId: string;
};

const LikeSchema = new Schema<Like>({
  username: {
    type: String,
    required: true,
  },
  mixtapeId: {
    type: String,
    required: true,
  },
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;

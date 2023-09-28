import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Song} from '../song/model';


/**
 * This file defines the properties stored in a favorite
 */

export type Favorite = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: User;
  song: Types.ObjectId;
};

export type PopulatedFavorite = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: User;
  song: Song;
};

const FavoriteSchema = new Schema<Favorite>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  song: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Song'
  }
});

const FavoriteModel = model<Favorite>('Favorite', FavoriteSchema);
export default FavoriteModel;

import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Favorite, PopulatedFavorite} from './model';
import type {Song} from '../song/model';
import { User } from '../user/model';

type FavoriteResponse = {
  _id: String;
  user: User;
  song: Song;
};

/**
 * Transform a raw Favorite object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Favorite>} favorite - A Favorite
 * @returns {FavoriteResponse} - The Favorite object formatted for the frontend
 */
const constructFavoriteResponse = (favorite: HydratedDocument<Favorite>): FavoriteResponse => {
  const favoriteCopy: PopulatedFavorite = {
    ...favorite.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...favoriteCopy,
    _id: favoriteCopy._id.toString(),
    user: favoriteCopy.user,
    song: favoriteCopy.song,
  };
};

export {
    constructFavoriteResponse
  };
  
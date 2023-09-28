import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Mixtape} from './model';
import type {Song} from '../song/model';

type MixtapeResponse = {
  _id: String;
  songs: Song[];
  creator: String;
  date: String;
  caption: String;
};

/**
 * Transform a raw Mixtape object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Mixtape>} mixtape - A Mixtape
 * @returns {MixtapeResponse} - The Mixtape object formatted for the frontend
 */
const constructMixtapeResponse = (mixtape: HydratedDocument<Mixtape>): MixtapeResponse => {
  const mixtapeCopy: Mixtape = {
    ...mixtape.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  if (mixtapeCopy.caption !== null && mixtapeCopy.caption !== undefined) {
    return {
      ...mixtapeCopy,
      _id: mixtapeCopy._id.toString(),
      songs: mixtapeCopy.songs,
      creator: mixtapeCopy.creator,
      date: mixtapeCopy.date,
      caption: mixtapeCopy.caption
    };
  }
  return {
    ...mixtapeCopy,
    _id: mixtapeCopy._id.toString(),
    songs: mixtapeCopy.songs,
    creator: mixtapeCopy.creator,
    date: mixtapeCopy.date
  };
};

export {
    constructMixtapeResponse
  };
  
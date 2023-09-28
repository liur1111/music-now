import type {HydratedDocument} from 'mongoose';
import type {Song} from './model';

type SongResponse = {
  _id: string;
  songTitle: string;
  songArtist: string;
  trackId: string;
  albumCover: string;
};

/**
 * Transform a raw Song object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Song>} song - A song
 * @returns {SongResponse} - The song object formatted for the frontend
 */
const constructSongResponse = (song: HydratedDocument<Song>): SongResponse => {
  const songCopy: Song = {
    ...song.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...songCopy,
    _id: songCopy._id.toString(),
    songTitle: songCopy.songTitle,
    songArtist: songCopy.songArtist,
    trackId: songCopy.trackId,
    albumCover: songCopy.albumCover
  };
};

export {
    constructSongResponse
  };
  
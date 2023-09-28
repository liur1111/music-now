import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Song
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Song on the backend
export type Song = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  songTitle: string;
  songArtist: string;
  trackId: string;
  albumCover: string;
};


// Mongoose schema definition for interfacing with a MongoDB table
// Songs stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const SongSchema = new Schema<Song>({
  // The song title
  songTitle: {
    type: String,
    required: true,
  },
  // The song artist name
  songArtist: {
    type: String,
    required: true
  },
  // The image for the album the song is from
  trackId: {
    type: String,
    required: true
  },
  albumCover: {
    type: String,
    required: true
  }

});

const SongModel = model<Song>('Song', SongSchema);
export default SongModel;

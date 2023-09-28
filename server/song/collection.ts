import type {HydratedDocument, Types} from 'mongoose';
import type {Song} from './model';
import SongModel from './model';

/**
 * This files contains a class that has the functionality to explore songs
 * stored in MongoDB, including adding, finding, and deleting songs.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Song> is the output of the SongModel() constructor,
 * and contains all the information in Song. https://mongoosejs.com/docs/typescript.html
 */
class SongCollection {
  /**
   * Add a Song to the collection
   *
   * @param {string} songTitle - The title of the song
   * @param {string} songArtist - The artist of the song
   * @param {string} trackId - The track Id of the song on spotify
   * @return {Promise<HydratedDocument<Song>>} - The newly created song
   */
  static async addOne(songTitle: string, songArtist: string, trackId: string, albumCover:string): Promise<HydratedDocument<Song>> {
    const song = new SongModel({
      songTitle,
      songArtist,
      trackId,
      albumCover
    });
    await song.save(); // Saves song to MongoDB
    return song;
  }

  /**
   * Get all the songs in the database
   *
   * @return {Promise<HydratedDocument<Song>[]>} - An array of all of the songs
   */
   static async findAll(): Promise<Array<HydratedDocument<Song>>> {
    return SongModel.find({});
  }

  /**
   * Find a song by trackId
   *
   * @param {string} trackId - The id of the song to find
   * @return {Promise<HydratedDocument<Song>> | Promise<null> } - The song with the given trackId, if any
   */
  static async findOne(trackId: Types.ObjectId | string): Promise<HydratedDocument<Song>> {
    return SongModel.findOne({trackId: trackId});
  }


  /**
   * Find a song by title and artist (case insensitive).
   *
   * @param {string} songTitle - The title of the song to find
   * @param {string} songArtist - The artist of the song to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
   static async findOneByTitleAndSong(songTitle: string, songArtist: string): Promise<HydratedDocument<Song>> {
    return SongModel.findOne({
      songTitle: new RegExp(`^${songTitle.trim()}$`, 'i'),
      songArtist: new RegExp(`^${songArtist.trim()}$`, 'i')
    });
  }

  /**
   * Delete a song with given trackId.
   *
   * @param {string} trackId - The trackId of the song to delete
   * @return {Promise<Boolean>} - true if the song has been deleted, false otherwise
   */
   static async deleteOneById(trackId: Types.ObjectId | string): Promise<boolean> {
    const song = await SongModel.deleteOne({_id: trackId});
    return song !== null;
  }

  /**
   * Delete a song with given title and artist.
   *
   * @param {string} songTitle - The title of the song to delete
   * @param {string} songArtist - The artist of the song to delete
   * @return {Promise<Boolean>} - true if the song has been deleted, false otherwise
   */
  static async deleteOne(songTitle: string, songArtist: string): Promise<boolean> {
    const song = await SongModel.deleteOne({
        songTitle: songTitle,
        songArtist: songArtist
    });
    return song !== null;
  }

}

export default SongCollection;

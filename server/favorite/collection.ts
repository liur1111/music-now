import type {HydratedDocument, Types} from 'mongoose';
import type {Favorite} from './model';
import FavoriteModel from './model';
import type {User} from '../user/model';
import UserCollection from '../user/collection';
import SongModel from '../song/model';

/**
 * This files contains a class that has the functionality to explore Favorites
 * stored in MongoDB, including adding and deleting likes.
 */
class FavoriteCollection {
  /**
   * Get all the favorites for a given song
   *
   * @param {string} trackId - The id of the given song
   * @return {Promise<Array<User>>} - An array of all of the favorites for a song
   */
  static async findFavoritesforSong(trackId: string): Promise<Array<Favorite>> {
    const song = await SongModel.findOne({trackId});
    const favorites: Favorite[] = await FavoriteModel.find({song: song});
    return favorites;
  }

  /**
   * Get all the favorites for a given user
   *
   * @param {string} username - The username
   * @return {Promise<Array<Like>>} - An array of all of the favorites sent by the user
   */
  static async findFavoritesByUser(username: string): Promise<Array<Favorite>> {
    const user = await UserCollection.findOneByUsername(username);
    const favorites: Favorite[] = await FavoriteModel.find({
      user: user
    }).populate('song');
    return favorites;
  }

  /**
   * Add a favories to the collection
   *
   * @param {string} trackId - the song that the favorite is being applied to
   * @param {string} username - The username of the user favoriting the song
   * @return {Promise<HydratedDocument<Favorite>>} - The new like
   */
  static async addOne(
    trackId: string,
    username: string
  ): Promise<HydratedDocument<Favorite>> {
    const song = await SongModel.findOne({trackId});
    const user: User = await UserCollection.findOneByUsername(username);

    const favorite = new FavoriteModel({user: user, song: song});
    await favorite.save();

    return favorite.populate('song');
  }

  /**
   * Removes a favorite
   *
   * @param {string} trackId - the song that the favorite is being removed from
   * @param {string} username - The username of the user removing the like
   * @return {Promise<HydratedDocument<Boolean>>} - if the favorite was removed
   */
  static async deleteOne(trackId: string, username: string): Promise<Boolean> {
    const song = await SongModel.findOne({trackId});
    const user: User = await UserCollection.findOneByUsername(username);

    const favorite = await FavoriteModel.deleteMany({user: user, song: song});
    return song !== null;
  }
}
export default FavoriteCollection;

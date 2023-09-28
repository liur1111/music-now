import type {HydratedDocument} from 'mongoose';
import type {Like} from './model';
import LikeModel from './model';

/**
 * This files contains a class that has the functionality to explore likes
 * stored in MongoDB, including adding and deleting likes.
 */
 class LikeCollection {
    /**
    * Get all the likes for a given mixtape
    *
    * @param {string} mixtapeId - The id of the given freet
    * @return {Promise<Array<string>>} - An array of all of the usernames for those who have liked the mixtpae 
    */
    static async findLikesByMixtape(mixtapeId: string): Promise<Array<string>> {
        const likes: Like[] = await LikeModel.find({mixtapeId: mixtapeId});
        const usernames: string[] = likes.map((x) => x.username);
        return usernames;
    }


    /**
    * Get all the likes sent by a given user
    *
    * @param {string} username - The username
    * @return {Promise<Array<Like>>} - An array of all of the likes sent by the user
    */
      static async findLikesByUser(username: string): Promise<Array<Like>> {
        const likes: Like[] = await LikeModel.find({username: username});
        return likes;
    }


    /**
     * Add a like to the collection
     *
     * @param {string} mixtapeId - the mixtape that the like is being applied to
     * @param {string} username - The username of the liker
     * @return {Promise<HydratedDocument<Freet>>} - The new like
     */
    static async addLike(mixtapeId: string, username: string): Promise<HydratedDocument<Like>> {
        const like = new LikeModel({username: username, mixtapeId:mixtapeId});
        await like.save()
        return like;
    }

    /**
     * Removes a like to the collection if the like is on the post
     *
     * @param {string} mixtapeId - the mixtape that the like is being applied to
     * @param {string} username - The username of the user liking the freet
     * @return {Promise<HydratedDocument<Freet>>} - The modified freet
     */
     static async removeLike(mixtapeId: string, username: string): Promise<Boolean> {
        const like = await LikeModel.deleteMany({username:username, mixtapeId: mixtapeId});
        return like !== null;
    }
}
export default LikeCollection


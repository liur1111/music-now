import type {HydratedDocument, Types} from 'mongoose';
import type {Comment} from './model';
import CommentModel from './model';
import UserCollection from '../user/collection';
import MixtapeCollection from '../mixtape/collection';

/**
 * This files contains a class that has the functionality to explore comments
 * stored in MongoDB, including adding, finding, updating, and deleting comments.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Comment> is the output of the CommentModel() constructor,
 * and contains all the information in Comment. https://mongoosejs.com/docs/typescript.html
 */
class CommentCollection {
  /**
   * Add a comment to the collection
   *
   * @param {string} authorId - The id of the author of the comment
   * @param {string} content - The id of the content of the comment
   * @param {string} mixtapeId - The id of the mixtape that the user commented on
   * @return {Promise<HydratedDocument<Comment>>} - The newly created comment
   */
  static async addOne(authorId: Types.ObjectId | string, content: string, mixtapeId: Types.ObjectId | string): Promise<HydratedDocument<Comment>> {
    const date = new Date();
    const comment = new CommentModel({
      authorId,
      mixtapeId,
      dateCreated: date,
      content,
      dateModified: date
    });
    await comment.save(); // Saves comment to MongoDB
    return comment.populate('authorId');
  }

  /**
   * Find a comment by commentId
   *
   * @param {string} commentId - The id of the comment to find
   * @return {Promise<HydratedDocument<Comment>> | Promise<null> } - The comment with the given commentId, if any
   */
  static async findOne(commentId: Types.ObjectId | string): Promise<HydratedDocument<Comment>> {
    return CommentModel.findOne({_id: commentId}).populate('authorId');
  }

  /**
   * Get all the comments in the database
   *
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the comments
   */
  static async findAll(): Promise<Array<HydratedDocument<Comment>>> {
    // Retrieves Comments and sorts them from most to least recent
    return CommentModel.find({}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Get all the comments in by given author
   *
   * @param {string} username - The username of author of the Comment
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the Comments
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Comment>>> {
    const author = await UserCollection.findOneByUsername(username);
    return CommentModel.find({authorId: author._id}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Get all the comments for a given mixtape
   *
   * @param {string} mixtapeId - The id of the mixtape that the comment is being left on
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the Comments on the mixtape
   */
   static async findAllByMixtape(mixtapeId: string | Types.ObjectId): Promise<Array<HydratedDocument<Comment>>> {
    const mixtape = await MixtapeCollection.findOneById(mixtapeId);
    return CommentModel.find({mixtapeId: mixtape._id}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Update a comment with the new content
   *
   * @param {string} commentId - The id of the comment to be updated
   * @param {string} content - The new content of the comment
   * @return {Promise<HydratedDocument<Comment>>} - The newly updated comment
   */
  static async updateOne(commentId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Comment>> {
    const comment = await CommentModel.findOne({_id: commentId});
    comment.content = content;
    comment.dateModified = new Date();
    await comment.save();
    return comment.populate('authorId');
  }

  /**
   * Delete a comment with given commentId.
   *
   * @param {string} commentId - The commentId of comment to delete
   * @return {Promise<Boolean>} - true if the comment has been deleted, false otherwise
   */
  static async deleteOne(commentId: Types.ObjectId | string): Promise<boolean> {
    const comment = await CommentModel.deleteOne({_id: commentId});
    return comment !== null;
  }

  /**
   * Delete all the comments by the given author
   *
   * @param {string} authorId - The id of author of comments
   */
  static async deleteManyByAuthor(authorId: Types.ObjectId | string): Promise<void> {
    await CommentModel.deleteMany({authorId});
  }

  /**
   * Delete all the comments by the given mixtape
   *
   * @param {string} mixtapeId - The id of mixtape containing comments
   */
   static async deleteManyByMixtape(mixtapeId: Types.ObjectId | string): Promise<void> {
    await CommentModel.deleteMany({mixtapeId});
  }
}

export default CommentCollection;

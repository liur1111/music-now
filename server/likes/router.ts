/* eslint-disable arrow-parens */
import type {Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as likeValidator from './middleware';
import type {Like} from  '../likes/model'
import LikeModel from '../likes/model';

const router = express.Router();


/**
 * Get all likes 
 *
 * @name GET api/likes
 *
 * @return {Like[]} - A list of all the users that liked a mixtape, unordered
 * @throws {403} - If the user is not logged in
 */
 router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const likes = await LikeModel.find({});
    res.status(200).json({
        message: 'The likes were found successfully.',
        likes: likes});
});

/**
 * Get all likes for a given mixtape
 *
 * @name GET api/likes/:mixtapeId?
 *
 * @return {String[]} - A list of all the users that liked a mixtape, unordered
 * @throws {403} - If the user is not logged in
 */
router.get(
  '/mixtapeId?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const mixtapeId = (req.params.mixtapeId as string) ?? undefined;
    if (mixtapeId !== undefined) {
        const likes = await LikeCollection.findLikesByMixtape(mixtapeId);
        res.status(200).json({
            message: 'The likes were found successfully.',
            likes: likes});
    } else {
        res.status(404)
    } 
});

// /**
//  * Get all likes by a given user
//  *
//  * @name GET api/likes/:username?
//  *
//  * @return {string[]} - A list of all the mixtapes liked by userId
//  * @throws {403} - If the user is not logged in
//  */
//  router.get(
//   '/:username?',
//   [
//     userValidator.isUserLoggedIn,
//   ],
//   async (req: Request, res: Response) => {
//     const username = (req.params.username as string) ?? undefined;
//     if (username !== undefined) {
//         const likes = await LikeCollection.findLikesByUser(username);
//         res.status(200).json({
//             message: 'The likes were found successfully.',
//             likes: likes});
//     } else {
//         res.status(404)
//     } 
// });

/**
 * Send a like to a mixtape
 *
 * @name POST /api/likes/:mixtapeId?username=username
 * 
 * @param {string} mixtapeId - the id for the mixtape being liked
 * @param {string} username - the username of the user liking the mixtape
 * 
 * @return {Like} - The created like object
 * @throws {403} - If the user is not logged in
 * @throws {405} - If the user has already liked the mixtpae
 */
router.post(
  '/:mixtapeId?',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isDoubleLike,
  ],
  async (req: Request, res: Response) => {
    const mixtapeId = (req.params.mixtapeId as string) ?? undefined;
    const username = (req.query.username as string) ?? undefined;
    const like: Like = await LikeCollection.addLike(mixtapeId, username);
    res.status(200).json({
        message: 'The like was added successfully.',
        like: like});
    } 
);

/**
 * Delete a like
 *
 * @name DELETE /api/likes/:mixtapeId?username=username
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in 
 * @throws {405} - if the user has not liked the mixtape
 */
router.delete(
  '/:mixtapeId?',
  [
    userValidator.isUserLoggedIn,
    likeValidator.unlikeWithoutLike,
  ],
  async (req: Request, res: Response) => {
    const mixtapeId = (req.params.mixtapeId as string) ?? undefined;
    const username = (req.query.username as string) ?? undefined;
    const unlike = await LikeCollection.removeLike(mixtapeId, username);
    if (unlike) {
        res.status(200).json({
            message: 'The mixtape was unliked successfully.'}); 
    } else {
        res.status(404).json({
            message: 'There was an error in unliking this mixtape.'}); 
    }  
  }
);

export {router as likeRouter};



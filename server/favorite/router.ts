import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import FavoriteCollection from './collection';
import * as songValidator from '../song/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all favorites for a user
 *
 * @name GET /api/favorite/:username?
 *
 * @return {FavoriteResponse[]} - A list of all faovrites sent by username
 * @throws {403} - If the user is not logged in
 */
router.get(
  '/:username?',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // got to next function if song arguments are given
    const username = (req.params.username as string) ?? undefined;
    const favorites = await FavoriteCollection.findFavoritesByUser(username);
    const response = favorites.map(util.constructFavoriteResponse);
    res.status(200).json(response);
  });

/**
 * Get the favorites by song
 *
 * @name GET /api/favorite/song/:trackId?
 *
 * @return {FavoriteResponse[]} - all favorites for given track
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the song with trackId does not exist
 *
 */
router.get(
'/song/:trackId?',
  [
    userValidator.isUserLoggedIn,
    songValidator.istrackIdExistsQuery
  ],
  async (req: Request, res: Response) => {
    const trackId = (req.params.trackId as string) ?? undefined;
    const favorites = await FavoriteCollection.findFavoritesforSong(trackId);
    const response = favorites.map(util.constructFavoriteResponse);
    res.status(200).json(response);
    }
);


/**
 * Create a new favorite.
 *
 * @name POST /api/favorite/:username?trackId=trackId
 * 
 * @param {string} username - The user favoriting the song
 * @param {string} trackId - the trackId for the song
 * 
 * @return {FavoriteResponse} - The created favorite
 * @throws {403} - If the user is not logged in
 *  @throws {404} - If the song with trackId does not exist
 */
router.post(
  '/:username?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const trackId = req.body.trackId as string;
    const favorite = await FavoriteCollection.addOne(trackId, username)

    res.status(201).json({
      message: 'Your favorite was created successfully.',
      prompt: util.constructFavoriteResponse(favorite)
    });
  }
);

/**
 * Delete a favorite
 *
 * @name DELETE /api/favorite/:username?trackId=trackId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the song with trackId does not exist
 * 
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const trackId = req.body.trackId as string;
    const favorite = await FavoriteCollection.deleteOne(trackId, username)

    res.status(200).json({
      message: 'Your favorite was deleted successfully.'
    });
  }
);

export {router as favoriteRouter};

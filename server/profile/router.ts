import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as profileValidator from '../profile/middleware';
import ProfileCollection from './collection';
import UserCollection from '../user/collection';
import * as util from './util';

const router = express.Router();

/**
 * Get all profiles in the database
 *
 * @name GET /api/profile/
 *
 * @return {ProfileResponse[]} - A list of all profiles created in the database
 * @throws {400} - If author is not given
 */
/**
 * Get the profile of a given user
 *
 * @name GET /api/profile?username=USERNAME
 *
 * @return {ProfileResponse} - Profile of the User
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  [profileValidator.isProfileExists],
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.username !== undefined) {
        next();
        return;
    }
    // get all profiles in the database
    const allProfiles = await ProfileCollection.findAll();
    const response = allProfiles.map(util.constructProfileResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    // get profile of the given user
    await ProfileCollection.findOneByUsername(req.query.username as string);
    const profile = await ProfileCollection.updateOne(req.query.username as string, null, null);
    const response = util.constructProfileResponse(profile);
    res.status(200).json(response);
  }
);

/**
 * Create a new profile.
 *
 * @name POST /api/profile/:username?
 *
 * @param {string} username - The name of the creator
 * 
 * @return {ProfileResponse} - The created profile
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/:username?',
  [
    // userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.params.username as string;
    const profile = await ProfileCollection.addOne(username);

    res.status(201).json({
      message: 'Your profile was created successfully.',
      profile: util.constructProfileResponse(profile)
    });
  }
);

/**
 * Update profile icon info
 *
 * @name PATCH /api/profile/:username?color=color&text=text
 *
 * @param {string} username - The name of the creator
 * @param {string} iconColor - The new color 
 * @param {string} iconText - The new text
 * 
 * @return {ProfileResponse} - The created profile
 * @throws {403} - If the user is not logged in
 */
 router.patch(
  '/:username?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.params.username as string;
    const iconColor = req.body.profileColor as string;
    const iconText = req.body.profileText as string;
    const profile = await ProfileCollection.updateOne(username, iconColor, iconText);

    res.status(201).json({
      message: 'Your profile was updated successfully.',
      profile: util.constructProfileResponse(profile)
    });
  }
);

/**
 * Delete a profile
 *
 * @name DELETE /api/profile/:username?
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
router.delete(
  '/:username?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.params.username as string
    await ProfileCollection.deleteOneByUsername(username);
    res.status(200).json({
      message: 'Your Profile was deleted successfully.'
    });
  }
);

export {router as profileRouter};

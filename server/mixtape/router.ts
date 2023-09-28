import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import SongCollection from '../song/collection';
import * as userValidator from '../user/middleware';
import * as mixtapeValidator from './middleware';
import MixtapeCollection from './collection';
import * as util from './util';

const router = express.Router();

/**
 *
 * @returns current date formatted as month, day, year
 */
function formatDate() {
  const date = new Date()
  const day = date.toLocaleString('en-US', {timeZone: 'America/New_York', day: 'numeric'});
  const month = date.toLocaleString('en-US', {timeZone: 'America/New_York', month: 'long'});
  const year = date.toLocaleString('en-US', {timeZone: 'America/New_York', year: 'numeric'});
  // // Formatted as Month Day, Year (Nov 21, 2022 for example)

  return `${month} ${day}, ${year}`;
}

/**
 * Get all mixtapes by a user
 *
 * @name GET /api/mixtape/:username
 *
 * @return {MixtapeResponse[]} - A list of all mixtapes created by username
 * @throws {400} - If author is not given
 */
/**
 * Get the mixtape by a user on a given date
 *
 * @name GET /api/mixtape/:username?date=date
 *
 * @return {MixtapeResponse} - Song with given title and author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 * @throws {405} - If the date is invalid
 *
 */
/**
 * Get all mixtapes for a user's feed
 *
 * @name GET /api/mixtape/:username?date=date&feed=true
 *
 * @return {MixtapeResponse[]} - A list of all mixtapes needed for a user's feed
 * @throws {400} - If author is not given
 */
router.get(
  '/:username?',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.date !== undefined) {
      next();
      return;
    }

    // Get all mixtapes by a user
    const username = req.params.username ?? undefined;
    const allUserMixtapes = await MixtapeCollection.findAllbyCreator(username);
    const response = allUserMixtapes.map(util.constructMixtapeResponse);
    res.status(200).json(response);
  },
  [mixtapeValidator.isMixtapeExists],
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.feed) {
      next();
      return;
    }

    // Get mixtape by creator by date
    const mixtape = await MixtapeCollection.findOneByCreatorByDate(
      req.params.username,
      req.query.date as string
    );

    const response = util.constructMixtapeResponse(mixtape);
    res.status(200).json(response);
  },
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    // Get all mixtapes needed for a user's feed
    const mixtapes = await MixtapeCollection.findAllForFeed(
      req.params.username
    );
    const response = mixtapes.map(util.constructMixtapeResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new mixtape.
 *
 * @name POST /api/mixtape/:username?
 *
 * Body: 3 song IDs
 *
 * @param {string} song1Id - The track Id of the song on spotify
 * @param {string} song2Id - The track Id of the song on spotify
 * @param {string} song3Id - The track Id of the song on spotify
 * @param {string} username - The name of the creator
 * @param {string} caption - the caption of the mixtape  
 *
 * @return {MixtapeResponse} - The created song
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/:username?',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const song1 = await SongCollection.findOne(req.body.song1);
    const song2 = await SongCollection.findOne(req.body.song2);
    const song3 = await SongCollection.findOne(req.body.song3);
    const caption = req.body.caption;
    const {username} = req.params;
    const mixtape = await MixtapeCollection.addOne(
      song1,
      song2,
      song3,
      username,
      formatDate(),
      caption
    );

    // Create a new like object to go along with the mixtape

    res.status(201).json({
      message: 'Your song was created successfully.',
      mixtape: util.constructMixtapeResponse(mixtape)
    });
  }
);

/**
 * Delete a mixtape
 *
 * @name DELETE /api/mixtape/:username?date=date
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
//  * @throws {404} - If the songId is not valid
 */
router.delete(
  '/:username?',
  [userValidator.isUserLoggedIn, mixtapeValidator.isMixtapeExists],
  async (req: Request, res: Response) => {
    const {username} = req.params;
    const date = req.query.date as string;
    await MixtapeCollection.deleteOneByCreatorByDate(username, date);
    res.status(200).json({
      message: 'Your Song was deleted successfully.'
    });
  }
);

export {formatDate, router as mixtapeRouter};

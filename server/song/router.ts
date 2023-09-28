/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import SongCollection from './collection';
import * as userValidator from '../user/middleware';
import * as songValidator from './middleware';
import * as util from './util';
import {getAuthToken} from './getToken';
import fetch from 'node-fetch';

const router = express.Router();

/**
 * Get all the songs
 *
 * @name GET /api/song
 *
 * @return {SongResponse[]} - A list of all songs
 */
/**
 * Get song by title and artist.
 *
 * @name GET /api/song?songTitle=songTitle&songArtist=songArtist
 *
 * @return {SongResponse} -Song with given title and author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // got to next function if song arguments are given
    if (
      req.query.songTitle !== undefined ||
      req.query.songArtist !== undefined ||
      req.query.trackId !== undefined
    ) {
      next();
      return;
    }
    const allSongs = await SongCollection.findAll();
    const response = allSongs.map(util.constructSongResponse);
    res.status(200).json(response);
  },
  [songValidator.isSongExists],
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await SongCollection.findOneByTitleAndSong(
      req.query.songTitle as string,
      req.query.songArtist as string
    );
    const response = util.constructSongResponse(song);
    res.status(200).json(response);
  }
);

/**
 * Get song information from Spotify API
 * @name GET /api/song/search?q=query
 *
 */
router.get(
  '/search',
  async (req: Request, res: Response) => {
    const token: string = await getAuthToken();
    const url = `https://api.spotify.com/v1/search?q=${req.query.q as string}&type=${req.query.type as string}&market=US&limit=6`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // eslint-disable-next-line arrow-parens
    }).then(async (r) => r.json());
    res.status(200).json(response);
});

/**
 * Create a new song.
 *
 * @name POST /api/song
 *
 * @param {string} songTitle - The title of the song
 * @param {string} songArtist - The artist of the song
 * @param {string} trackId - The track Id of the song on spotify
 * @param {string} albumCover - the cover art link
 * @return {SongResponse} - The created song
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the song title, artist or trackId is empty or a stream of empty spaces
 */
router.post(
  '/',
  [userValidator.isUserLoggedIn, songValidator.isValidSongContent],
  async (req: Request, res: Response) => {
    const song = await SongCollection.addOne(
      req.body.songTitle,
      req.body.songArtist,
      req.body.trackId,
      req.body.albumCover
    );

    res.status(201).json({
      message: 'Your song was created successfully.',
      song: util.constructSongResponse(song)
    });
  }
);

/**
 * Delete a song
 *
 * @name DELETE /api/song/:trackId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the songId is not valid
 */
router.delete(
  '/:trackId?',
  [userValidator.isUserLoggedIn, songValidator.istrackIdExists],
  async (req: Request, res: Response) => {
    await SongCollection.deleteOneById(req.params.songId);
    res.status(200).json({
      message: 'Your Song was deleted successfully.'
    });
  }
);

export {router as songRouter};

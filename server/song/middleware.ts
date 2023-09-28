import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import SongCollection from './collection';

/**
 * Checks if a Song with songTitle and songArtist in req.query exists
 */
const isSongExists = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOneByTitleAndSong(req.query.songTitle as string, req.query.songArtist as string);
  if (!song) {
    res.status(404).json({
      error: `Song with title ${req.params.songTitle} by ${req.params.songArtist} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Song with trackId in req.params exists
 */
 const istrackIdExists = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOne(req.params.trackId);
  if (!song) {
    res.status(404).json({
      error: `Song with id ${req.params.songId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Song with trackId in req.body exists
 */
 const istrackIdExistsBody = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOne(req.body.trackId);
  if (!song) {
    res.status(404).json({
      error: `Song with id ${req.body.songId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Song with songId in req.query exists
 */
 const istrackIdExistsQuery = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOne(req.query.trackId as string);
  if (!song) {
    res.status(404).json({
      error: `Song with id ${req.query.songId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidSongContent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.songTitle.trim()) {
    res.status(400).json({
      error: 'Title content must be at least one character long.'
    });
    return;
  }
  if (!req.body.songArtist.trim()) {
    res.status(400).json({
      error: 'Artist content must be at least one character long.'
    });
    return;
  }

  if (!req.body.trackId.trim()) {
    res.status(400).json({
      error: 'trackId content must be at least one character long.'
    });
    return;
  }

  next();
};

export {
  isValidSongContent,
  isSongExists,
  istrackIdExists,
  istrackIdExistsQuery,
  istrackIdExistsBody
};

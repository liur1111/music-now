import type {Request, Response, NextFunction} from 'express';
import MixtapeCollection from './collection';

/**
 * Checks if a Mixtape with creator and date in req.params exists
 */
const isMixtapeExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = (req.query.date as string) ?? undefined;
  const mixtape = await MixtapeCollection.findOneByCreatorByDate(
    req.params.username,
    date
  );
  if (!mixtape) {
    res.status(404).json({
      error: `Mixtape with creator ${req.params.username} posted on ${req.params.date} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Mixtape with a given id exists
 */
const isMixtapeExistsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mixtape = await MixtapeCollection.findOneById(
    req.query.mixtape as string
  );
  if (!mixtape) {
    res.status(404).json({
      error: `Mixtape with id ${req.query.mixtape as string} does not exist.`
    });
    return;
  }

  next();
};

export {isMixtapeExists, isMixtapeExistsById};

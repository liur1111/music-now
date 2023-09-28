import {Request, Response, NextFunction} from 'express';
import LikeCollection from './collection';


/**
 * Checks if a user is trying to double-like a post
 */
 const isDoubleLike = async (req: Request, res: Response, next: NextFunction) => {
    const mixtapeId = (req.params.mixtapeId as string) ?? undefined;
    const user = (req.query.username as string);
    const currentLikes: string[] = await LikeCollection.findLikesByMixtape(mixtapeId);
    const userCurrentLikes = currentLikes.filter((x) => x === user);
    
    if (userCurrentLikes.length > 0) {
        res.status(405).json({
            message: 'You already liked this freet!'
        });
        return;
    }
    next();
  };
  

/**
 * Checks if a user is trying to remove a like without the like existing
 */
 const unlikeWithoutLike = async (req: Request, res: Response, next: NextFunction) => {
    const mixtapeId = (req.params.mixtapeId as string) ?? undefined;
    const user = (req.query.username as string);
    const currentLikes: string[] = await LikeCollection.findLikesByMixtape(mixtapeId);
    const userCurrentLikes = currentLikes.filter((x) => x === user);

    if (userCurrentLikes.length === 0) {
        res.status(405).json({
            message: 'You have not liked this freet!'
        });
        return;
    }
    next();
  };
  


export {isDoubleLike, unlikeWithoutLike};

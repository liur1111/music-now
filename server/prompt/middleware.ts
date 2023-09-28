import type {Request, Response, NextFunction} from 'express';
import PromptCollection from './collection';
import { moderators } from './moderators';

/**
 * Checks if user making changes to prompts is a moderator
 */
const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  const username = (req.query.username as string) ?? undefined;

  if (!moderators.includes(username)){
    res.status(405).json({
      error: `User with usernmame ${req.params.username} does not have access to prompt capabilities.`
    });
    return;
  }

  next();
};


/**
 * Checks if a prompt exists to delete it
 */
 const deleteNonexistentPrompt = async (req: Request, res: Response, next: NextFunction) => {
    const date = (req.query.date as string) ?? undefined;
    const prompt = await PromptCollection.findByDate(date);
    if (!prompt) {
      res.status(406).json({
        error: `No prompt exists on ${req.params.date} to delete.`
      });
      return;
    }
    next();
  };

/**
 * Checks if a prompt already exists on a given day
 */
 const doublePost = async (req: Request, res: Response, next: NextFunction) => {
    const date = (req.query.date as string) ?? undefined;
    const prompt = await PromptCollection.findByDate(date);
    if (prompt) {
      res.status(406).json({
        error: `A prompt already exists on ${req.params.date}!`
      });
      return;
    }
    next();
  };
  
export {
    deleteNonexistentPrompt,
    doublePost,
    isModerator
  };
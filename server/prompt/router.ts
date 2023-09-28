import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as promptValidator from './middleware';
import PromptCollection from './collection';
import * as util from './util';

const router = express.Router();

/**
 * Get all prompts
 *
 * @name GET /api/prompt
 *
 * @return {PromptResponse[]} - A list of all mixtapes created by username
 * @throws {403} - If the user is not logged in
 */
/**
 * Get the prompt by date
 *
 * @name GET /api/prompt?date=date
 *
 * @return {PromptResponse} - Song with given title and author
 * @throws {403} - If the user is not logged in
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // got to next function if song arguments are given
    if (req.query.date !== undefined) {
        next();
        return;
    }
    const username = (req.params.username as string) ?? undefined;
    const allPrompts = await PromptCollection.findAll();
    const response = allPrompts.map(util.constructPromptResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const prompt = await PromptCollection.findByDate(req.query.date as string);
    const response = prompt.map(util.constructPromptResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new prompt.
 *
 * @name POST /api/prompt?promptText&date&username
 * 
 * @param {string} promptText - The text for the prompt
 * @param {Date} date - the day for the prompt to be posted
 * 
 * @return {PromtResponse} - The created prompt
 * @throws {403} - If the user is not logged in
 * @throws {405} - If the user is not an allowed moderator user
 * @throws {406} - if a prompt already exists for that day
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    promptValidator.isModerator,
    promptValidator.doublePost
  ],
  async (req: Request, res: Response) => {
    const promptText = req.query.promptText as string;
    const date = req.query.date as string;
    const prompt = await PromptCollection.addOne(promptText, date)

    res.status(201).json({
      message: 'Your prompt was created successfully.',
      prompt: util.constructPromptResponse(prompt)
    });
  }
);

/**
 * Delete a prompt by date
 *
 * @name DELETE /api/prompt?date=date
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {405} - If the user is not an allowed moderator user
 * @throws {406} - if there exists no prompt on the provided date
 * 
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    promptValidator.isModerator,
    promptValidator.deleteNonexistentPrompt
  ],
  async (req: Request, res: Response) => {
    const date = req.query.date as string;
    await PromptCollection.deleteOneByDate(date);
    res.status(200).json({
      message: 'Your prompt was deleted successfully.'
    });
  }
);

export {router as promptRouter};

import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Prompt} from './model';

type PromptResponse = {
  _id: string;
  promptText: string;
  date: string;
};

/**
 * Transform a raw Prompt object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Prompt>} prompt - A prompt
 * @returns {PromptResponse} - The prompt object formatted for the frontend
 */
const constructPromptResponse = (prompt: HydratedDocument<Prompt>): PromptResponse => {
  const promptCopy: Prompt = {
    ...prompt.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...promptCopy,
    _id: promptCopy._id.toString(),
    promptText: promptCopy.promptText,
    date: promptCopy.date
  };
};

export {
    constructPromptResponse
  };
  
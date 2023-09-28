import type {HydratedDocument, Types} from 'mongoose';
// import SongModel, { Song } from 'server/song/model';
import type {Prompt} from './model';
import PromptModel from './model';
// import SongModel from './model';

/**
 * This files contains a class that has the functionality to explore prompts
 * stored in MongoDB, including adding, finding, and deleting prompts.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<MixtapeCollection> is the output of the promptsModel() constructor,
 * and contains all the information in prompts. https://mongoosejs.com/docs/typescript.html
 */
class PromptCollection {
  /**
   * Add a prompt to the collection
   *
   * @param {string} promptText - The text stored in the prompt
   * @param {string} date - The date the prompt is posted
   * @return {Promise<HydratedDocument<Prompt>>} - The newly created prompt
   */
  static async addOne(promptText: string, date: string): Promise<HydratedDocument<Prompt>> {
    const prompt = new PromptModel({
      promptText,
      date
    });
    await prompt.save(); // Saves prompt to MongoDB
    return prompt;
  }

  /**
   * Get all the prompts in the database
   *
   * @return {Promise<HydratedDocument<Prompt>[]>} - An array of all of the prompts
   */
   static async findAll(): Promise<Array<HydratedDocument<Prompt>>> {
    // Retrieves all prompts
    return PromptModel.find({});
  }

  /**
   * Find a prompt by date
   *
   * @param {string} date - The day the desired prompt is for
   * @return {Promise<Array<HydratedDocument<Mixtape>.> | Promise<null> } - The prompt for that date if any
   */
  static async findByDate(date: string): Promise<Array<HydratedDocument<Prompt>>> {
    return PromptModel.find({date});
  }

  

  /**
   * Delete a prompt with given date.
   *
   * @param {string} date - The date of the mixtape to delete
   * @return {Promise<Boolean>} - true if the song has been deleted, false otherwise
   */
   static async deleteOneByDate(date: string): Promise<boolean> {
    const mixtape = await PromptModel.deleteOne({date});
    return mixtape !== null;
  }

  
}

export default PromptCollection;

import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CommentCollection from './collection';
import * as userValidator from '../user/middleware';
import * as mixtapeValidator from '../mixtape/middleware';
import * as commentValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the comments
 *
 * @name GET /api/comments
 *
 * @return {CommenttResponse[]} - A list of all the comments sorted in descending
 *                                order by date modified
 */
/**
 * Get comments by author.
 *
 * @name GET /api/comments?author=username
 *
 * @return {CommentResponse[]} - An array of comments created by user with username, author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
/**
 * Get comments by mixtape.
 *
 * @name GET /api/comments?mixtape=mixtapeId
 *
 * @return {CommentResponse[]} - An array of comments made on a mixtape with the given mixtapeId
 * @throws {400} - If author is not given
 * @throws {404} - If no mixtape has given mixtapeId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if author or mixtape query parameter was supplied
    if (req.query.author !== undefined || req.query.mixtape !== undefined) {
      next();
      return;
    }

    const allComments = await CommentCollection.findAll();
    const response = allComments.map(util.constructCommentResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if mixtape query parameter was supplied
    if (req.query.mixtape !== undefined) {
      next();
      return;
    }

    // Perform middleware check now that we know this is the 'author'case
    await userValidator.isAuthorExists(req, res, next);
    const authorComments = await CommentCollection.findAllByUsername(
      req.query.author as string
    );
    const response = authorComments.map(util.constructCommentResponse);
    res.status(200).json(response);
  },
  [mixtapeValidator.isMixtapeExistsById],
  async (req: Request, res: Response) => {
    const mixtapeComments = await CommentCollection.findAllByMixtape(
      req.query.mixtape as string
    );

    const response = mixtapeComments.map(util.constructCommentResponse);

    res.status(200).json(response);
  }
);

/**
 * Create a new comment.
 *
 * @name POST /api/comments/:mixtapeId
 *
 * @param {string} content - The content of the comment
 * @param {string} mixtapeId - The id of the mixtape that is being commented on
 * @return {CommentResponse} - The created comment
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 */
router.post(
  '/:mixtapeId',
  [userValidator.isUserLoggedIn, commentValidator.isValidCommentContent],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const comment = await CommentCollection.addOne(
      userId,
      req.body.content,
      req.params.mixtapeId
    );

    res.status(201).json({
      message: 'Your comment was created successfully.',
      comment: util.constructCommentResponse(comment)
    });
  }
);

/**
 * Delete a comment
 *
 * @name DELETE /api/comments/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the comment
 * @throws {404} - If the commentId is not valid
 */
router.delete(
  '/:commentId?',
  [
    userValidator.isUserLoggedIn,
    commentValidator.isCommentExists,
    commentValidator.isValidCommentModifier
  ],
  async (req: Request, res: Response) => {
    await CommentCollection.deleteOne(req.params.commentId);
    res.status(200).json({
      message: 'Your comment was deleted successfully.'
    });
  }
);

/**
 * Modify a comment
 *
 * @name PATCH /api/comments/:id
 *
 * @param {string} content - the new content for the comment
 * @return {CommentResponse} - the updated comment
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the comment
 * @throws {404} - If the commentId is not valid
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 * @throws {413} - If the comment content is more than 140 characters long
 */
router.patch(
  '/:commentId?',
  [
    userValidator.isUserLoggedIn,
    commentValidator.isCommentExists,
    commentValidator.isValidCommentModifier,
    commentValidator.isValidCommentContent
  ],
  async (req: Request, res: Response) => {
    const comment = await CommentCollection.updateOne(
      req.params.commentId,
      req.body.content
    );
    res.status(200).json({
      message: 'Your comment was updated successfully.',
      comment: util.constructCommentResponse(comment)
    });
  }
);

export {router as commentRouter};

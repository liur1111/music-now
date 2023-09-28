/* eslint-disable arrow-parens */
import type {HydratedDocument} from 'mongoose';
import type {Like} from './model';

type likeResponse = {
  _id: string;
  mixtapeId: string;
  username: string;
};

/**
 * Transform a raw likedObject object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<likedObject>} liked - A likedObject
 * @returns {likeResponse} - The likedObject object formatted for the frontend
 */
const constructLikeResponse = (
  liked: HydratedDocument<Like>
): likeResponse => {
  const likeCopy: Like = {
    ...liked.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    _id: likeCopy._id.toString(),
    username: likeCopy.username,
    mixtapeId: likeCopy.mixtapeId
  };
};

export {constructLikeResponse};

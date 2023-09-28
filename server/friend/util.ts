import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Friend} from './model';

type FriendResponse = {
  _id: String;
  requestingUser: string;
  user: String;
  confirmed: Boolean;
};

/**
 * Transform a raw Friend object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Friend>} friend - A Friend
 * @returns {FriendResponse} - The Mixtape object formatted for the frontend
 */
const constructFriendResponse = (friend: HydratedDocument<Friend>): FriendResponse => {
  const friendCopy: Friend = {
    ...friend.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...friendCopy,
    _id: friendCopy._id.toString(),
    requestingUser: friendCopy.requestingUser,
    user: friendCopy.user,
    confirmed: friendCopy.confirmed,
  };
};

export {
    constructFriendResponse
  };
  
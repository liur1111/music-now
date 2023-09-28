import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Profile} from './model';
import type {User} from '../user/model';
import type {Favorite} from '../favorite/model';
import type {Mixtape} from '../mixtape/model';

type ProfileResponse = {
  _id: String;
  username: String;
  fullName: String;
  user: User;
  favorites: Favorite[];
  mixtapes: Mixtape[];
  friends: String[];
  friendRequests: String[];
  iconColor: String;
  iconText: String;
};

/**
 * Transform a raw Profile object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Profile>} profile - A Profile
 * @returns {ProfileResponse} - The Profile object formatted for the frontend
 */
const constructProfileResponse = (profile: HydratedDocument<Profile>): ProfileResponse => {
  const profileCopy: Profile = {
    ...profile.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...profileCopy,
    _id: profileCopy._id.toString(),
    username: profileCopy.username,
    fullName: profileCopy.fullName,
    user: profileCopy.user,
    favorites: profileCopy.favorites,
    mixtapes: profileCopy.mixtapes,
    friends: profileCopy.friends,
    friendRequests: profileCopy.friendRequests,
    iconColor: profileCopy.iconColor,
    iconText: profileCopy.iconText,
  };
};

export {
    constructProfileResponse
  };
  
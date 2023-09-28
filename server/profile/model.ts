import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type { Favorite } from '../favorite/model';
import type { Mixtape } from '../mixtape/model';
import type { Friend } from '../friend/model';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Profile = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  fullName: string;
  user: User;
  favorites: Favorite[];
  mixtapes: Mixtape[];
  friends: String[];
  friendRequests: String[];
  iconColor: String;
  iconText: String;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ProfileSchema = new Schema({
    // The username of the user that the profile belongs to
  username: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  // The user that the profile belongs to
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // List of all of the songs that a User has added to their favorites 
  favorites: {
    type: Array,
    required: true
  },
  // List of all of the mixtapes that a user has made  
  mixtapes: {
    type: Array,
    required: true
  },
  // List of all of the friends that a user has   
  friends: {
    type: Array,
    required: true
  },
  // List of all of the friend requests that a user has   
  friendRequests: {
    type: Array,
    required: true
  },
  iconColor: {
    type: String,
    required: false
  },
  iconText: {
    type: String,
    required: false
  },
});

const ProfileModel = model<Profile>('Profile', ProfileSchema);
export default ProfileModel;
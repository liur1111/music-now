import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Friend
 */

// Type definition for Friend on the backend
export type Friend =  {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    requestingUser: string;
    user: string;
    confirmed: boolean;
};

const FriendSchema = new Schema<Friend>({
    requestingUser: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    }
})

const FriendModel = model<Friend>('Friend', FriendSchema);
export default FriendModel;

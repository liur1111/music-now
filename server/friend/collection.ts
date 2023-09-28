import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import type {Friend} from './model';
import FriendModel from './model';

/**
 * This files contains a class that has the functionality to explore friends
 * stored in MongoDB
 */
class FriendCollection {
  /**
   * Get all of a users' friends
   *
   * @param {string} username - The username of the given user
   * @return {Promise<Array<String>>} - An array of all of friends
   */
  static async findFriends(username: string): Promise<string[]> {
    const friendSet = new Set<string>();

    // The list of friend objects where the user is the friendship requestee
    const friendsThatRequestedUser = await FriendModel.find({
      user: username,
      confirmed: true
    });
    friendsThatRequestedUser.forEach((friendObj) =>
      friendSet.add(friendObj.requestingUser)
    );

    // The list of friend objects where the user is the friendship requester
    const friendsThatUserRequested = await FriendModel.find({
      requestingUser: username,
      confirmed: true
    });
    friendsThatUserRequested.forEach((friendObj) =>
      friendSet.add(friendObj.user)
    );

    return [...friendSet];
  }

  /**
   * Get all of a users' friend requests
   *
   * @param {string} username - The username of the given user
   * @return {Promise<Array<String>>} - An array of all of the current friend requests a user has
   */
  static async findFriendRequests(username: string): Promise<Array<string>> {
    const friendRequests = await FriendModel.find({
      user: username,
      confirmed: false
    });
    const usernames: string[] = friendRequests.map((x) => x.requestingUser);
    return usernames;
  }

  /**
   * Get all of a users' friend requests that they've sent
   *
   * @param {string} username - The username of the given user
   * @return {Promise<Array<String>>} - An array of all of the current friend requests a user has
   */
   static async findFriendRequestsSent(username: string): Promise<Array<string>> {
    const friendRequests = await FriendModel.find({
      requestingUser: username,
      confirmed: false
    });
    const usernames: string[] = friendRequests.map((x) => x.user);
    return usernames;
  }

  /**
   * Get all of a users' friend requests that they've sent
   *
   * @param {string} username - The username of the given user
   * @return {Promise<Array<String>>} - An array of all of the possible users to friend
   */
   static async findPotentialFriends(username: string): Promise<Array<string>> {
    const requests = await FriendCollection.findFriendRequests(username);
    const sentRequests = await FriendCollection.findFriendRequestsSent(username);
    const friends = await FriendCollection.findFriends(username);

    const user = await UserCollection.findOneByUsername(username);
    const allUsers = await UserCollection.findAllExcept(user._id);
    const allUsernames = allUsers.map((x) => x.username);

    const diff1 = [...allUsernames].filter(
      (user) => !requests.includes(user)
    );
    const diff2 = [...diff1].filter(
      (user) => !sentRequests.includes(user)
    );
    const possibleFriends = [...diff2].filter(
      (user) => !friends.includes(user)
    );

    return possibleFriends;
  }


  /**
   * Create a friend request
   *
   * @param {string} requestingUser - The id of the user making the friend request
   * @param {string} user - the Id of the user responding
   * @return {Promise<Friend>} - The new follow information
   */
  static async sendFriendRequest(
    requestingUser: string,
    user: string
  ): Promise<HydratedDocument<Friend>> {
    const friend = new FriendModel({requestingUser, user, confirmed: false});
    await friend.save(); // save to DB

    return friend;
  }

  /**
   * Accept a friend request
   *
   * @param {string} requestingUser - The id of the user making the friend request
   * @param {string} user - the Id of the user responding
   * @return {Promise<Friend>} - The new follow information
   */
  static async acceptRequest(
    requestingUser: string,
    user: string
  ): Promise<HydratedDocument<Friend>> {
    const friend = await FriendModel.deleteOne({
      requestingUser,
      user,
      confirmed: false
    });
    const acceptedFriend = new FriendModel({
      requestingUser,
      user,
      confirmed: true
    });
    await acceptedFriend.save(); // save to DB

    return acceptedFriend;
  }

  /**
   * Reject a friend request
   *
   * @param {string} requestingUser - The id of the user making the friend request
   * @param {string} user - the Id of the user responding
   * @return {Promise<Boolean>} - The new follow information
   */
  static async rejectRequest(
    requestingUser: string,
    user: string
  ): Promise<Boolean> {
    const friend = await FriendModel.deleteOne({
      requestingUser,
      user,
      confirmed: false
    });

    return friend !== null;
  }

  /**
   * Remove a friend
   *
   * @param {string} requestingUser - the id of one of the users
   * @param {string} user - the Id of the otheruser
   * @return {Promise<Boolean>} - The new follow information
   */
  static async removeFriend(
    requestingUser: string,
    user: string
  ): Promise<Boolean> {
    const friend = await FriendModel.deleteOne({
      requestingUser,
      user,
      confirmed: true
    });
    const friend2 = await FriendModel.deleteOne({
      user: requestingUser,
      requestingUser: user,
      confirmed: true
    });

    return friend !== null || friend2 !== null;
  }
}
export default FriendCollection;

import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import * as helper from '../helpers.js';
import {users} from "../config/mongoCollections.js";
//import mongo collections, bcrypt and implement the following data functions

const SALT_ROUNDS=10;

export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) =>
{
  helper.signUpVerify(firstName, lastName, userId, password, favoriteQuote, themePreference, role);
  firstName=firstName.trim();
  lastName=lastName.trim();
  userId=userId.trim().toLowerCase();
  password=password.trim();
  favoriteQuote=favoriteQuote.trim();
  themePreference.background=themePreference.background;
  themePreference.fontColor=themePreference.fontColor;
  let userCollection = await users();

  let existingUser = await userCollection.findOne({ userId: new RegExp(`^${userId}$`, 'i') });
  if(existingUser)
  {
    throw "Error, user already exists";
  }

  let hashPass=await bcrypt.hash(password, SALT_ROUNDS);

  let newUser=
  {
    firstName,
    lastName,
    userId: userId.toLowerCase(),
    password: hashPass,
    favoriteQuote,
    themePreference,
    role: role.toLowerCase()
  };

  let update = await userCollection.insertOne(newUser);

  if(!update)
  {
  throw "Error, unable to add user!";
  }

  return { registrationCompleted: true };
};


export const signInUser = async (userId, password) =>
{
  helper.signInVerify(userId, password);
  userId=userId.trim().toLowerCase();
  password=password.trim();
  let userCollection=await users();

  let user=await userCollection.findOne({userId: userId });
  if(!user)
  {
    throw "Error, either username or password is invalid! (dumbass hacker)";
  }
  
  let passMatch=await bcrypt.compare(password, user.password);
  if(!passMatch)
  {
    throw "Error, either username or password is invalid! (dumbass hacker)";
  }
  
  let { firstName, lastName, userId: dbUserId, favoriteQuote, themePreference, role } = user;
  return { firstName, lastName, userId: dbUserId, favoriteQuote, themePreference, role };
};

import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
// POST
// Create prisma.
//  Public
const createConversation = asyncHandler(async (req, res) => {
  const { members, isGroup, lastMessage, userId } = req.body;
  const senderuserId = req.user?.userId;

});

// GET Review of the user conversation
//  Public
// send the conversation Id only
const getUserConversation = asyncHandler(async (req, res) => {
  // get the conversation id form the req params

});

const UserConversations = asyncHandler(async (req, res) => {
  // get the conversation id form the req params

});

const getAllUserConversation = asyncHandler(async (req, res) => {
  // get the conversation id form the req params

});


//  Public
const DeleteConversation = asyncHandler(async (req, res) => {
  // get the request body

});

export {
  getAllUserConversation,
  createConversation,
  getUserConversation,
  DeleteConversation,
  UserConversations,
};

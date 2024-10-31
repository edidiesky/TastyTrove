import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
// Create Message
//  Public
const createMessage = asyncHandler(async (req, res) => {
  // get the body message
  const conversationId = req.params.id;
  const { text, receiverid } = req.body;
  // console.log(conversationId)
  const senderId = req.user?.userId;
  const conversation = await prisma.conversations.findUnique({
    where: {
      id: conversationId,
      userIDs: {
        hasSome: [senderId],
      },
    },
  });
  if (!conversation) {
    res.status(404);
    throw new Error("Conversation does not exist");
  }
  // created the user message
  const message = await prisma.message.create({
    data: {
      text,
      conversationId,
      userId: senderId,
      receiverid,
    },
  });
  // updated the conversation
  await prisma.conversations.update({
    where: {
      id: conversationId,
    },
    data: {
      seenBy: [senderId],
      lastMessage: text,
    },
  });

  res.status(200).json(message);
});

// GET
// GET All Message
//  Public
const getAllMessageofAConversation = asyncHandler(async (req, res) => {
  res.status(200).json({ messages });
});

// GET All Message
//  Public
const DeleteMessage = asyncHandler(async (req, res) => {});

const UpdateMessage = asyncHandler(async (req, res) => {});

export {
  createMessage,
  DeleteMessage,
  getAllMessageofAConversation,
  UpdateMessage,
};

import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
// POST
// Create prisma.
//  Public
const createConversation = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // get the conversation id form the req params
  const tokenUserId = req.user?.userId;
  let conversation = await prisma.conversations.findFirst({
    where: {
      userIDs: {
        hasEvery: [tokenUserId, userId],
      },
    },
  });
  if (!conversation) {
    conversation = await prisma.conversations.create({
      data: {
        userIDs: [tokenUserId, userId],
      },
    });
  }

  res.status(200).json({ conversation });
});

// GET Review of the user conversation
//  Public
// send the conversation Id only
const getSingleUserConversation = asyncHandler(async (req, res) => {
  const tokenUserId = req.user?.userId;
  const conversation = await prisma.conversations.findUnique({
    where: {
      id: req.params.id,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    include: {
      messages: {
        include: {
          receiver: {
            select: {
              name: true,
              id: true,
              username: true,
              image: true,
            },
          },
          sender: {
            select: {
              name: true,
              id: true,
              username: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  // update the read parameter
  await prisma.conversations.update({
    where: {
      id: req.params.id,
    },
    data: {
      seenBy: {
        push: [tokenUserId],
      },
    },
  });

  res.status(200).json({ conversation });
});

const getAllUserConversation = asyncHandler(async (req, res) => {
  // get the conversation id form the req params
  const tokenUserId = req.user?.userId;
  const conversation = await prisma.conversations.findMany({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });
  // loop to set the receiver in the conversation object
  for (let singleconversation of conversation) {
    // get the receiverid
    const receiverid = singleconversation.userIDs.find(
      (id) => id != tokenUserId
    );
    // find the user (receiver)
    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverid,
      },
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
      },
    });
    singleconversation.receiver = receiver;
  }
  res.status(200).json({ conversation });
});

//  Public
const DeleteConversation = asyncHandler(async (req, res) => {
  // get the request body
  const tokenUserId = req.user?.userId;
});

export {
  getAllUserConversation,
  createConversation,
  getSingleUserConversation,
  DeleteConversation,
};

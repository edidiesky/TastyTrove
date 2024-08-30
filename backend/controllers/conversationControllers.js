import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
// POST
// Create prisma.
//  Public
const createConversation = asyncHandler(async (req, res) => {
  const { members, isGroup, lastMessage, userId } = req.body;
  const senderuserId = req.user?.userId;

  try {
    const existingConversations = await prisma.conversations.findFirst({
      where: {
        OR: [
          {
            userIds: {
              has: senderuserId,
            },
            userIds: {
              has: userId,
            },
          },
          {
            userIds: {
              has: userId,
            },
            userIds: {
              has: senderuserId,
            },
          },
        ],
      },
    });

    if (existingConversations) {
      res.status(200).json({ conversation: existingConversations });
    } else {
      const conversationdata = {
        lastMessage,
        isGroup,
        userIds: [senderuserId, userId],
      };

      const newConversation = await prisma.conversations.create({
        data: conversationdata,
        include: {
          users: true,
        },
      });

      res.status(200).json({ conversation: newConversation });
    }
  } catch (error) {
    res.status(401).json({ message: error?.message });
  }
});


// GET Review of the user conversation
//  Public
// send the conversation Id only
const getUserConversation = asyncHandler(async (req, res) => {
  // get the conversation id form the req params
  const userId = req.params.id;
  const senderuserId = req.user?.userId;
  //  find a unique document containiung the convo id
  const conversation = await prisma.conversations.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (conversation) {
    res.status(200).json({ conversation: conversation });
  } else {
    res.status(200).json({ conversation: null });
  }
});

const UserConversations = asyncHandler(async (req, res) => {
  // get the conversation id form the req params
  const receiverId = req.query.receiverId;
  // console.log(receiverId);
  const senderuserId = req.user?.userId;
  //  find a unique document containiung the convo id
  const existingConversations = await prisma.conversations.findFirst({
    where: {
      OR: [
        {
          userIds: {
            equals: [senderuserId, receiverId],
          },
        },
        {
          userIds: {
            equals: [receiverId, senderuserId],
          },
        },
      ],
    },
  });
  console.log("existingConversations:", existingConversations);

  if (existingConversations) {
    res.status(200).json({ conversation: existingConversations });
  } else {
    res.status(200).json({ conversation: null });
  }
});

const getAllUserConversation = asyncHandler(async (req, res) => {
  // get the conversation id form the req params
  const senderuserId = req.user?.userId;
  //  find a unique document containiung the convo id
  const conversation = await prisma.conversations.findMany({
    where: {
      userIds: {
        has: senderuserId,
      },
    },
    include: {
      users: true,
    },
  });
  const newConversation = conversation?.flatMap((newconversation) => {
    const filteredUsers = newconversation?.users?.filter(
      (user) => user?.id !== senderuserId
    );
    return filteredUsers;
  });

  res.status(200).json({ conversation: newConversation });
});


//  Public
const DeleteConversation = asyncHandler(async (req, res) => {
  // get the request body
  const curentUserId = req?.user?.userId;

  const conversation = await prisma.conversations.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      users: true,
    },
  });
  if (!conversation) {
    res.status(404);
    throw new Error("No such conversation exists");
  }

  await prisma.conversations.deleteMany({
    where: {
      id: req.params.id,
      userIds: {
        hasSome: [curentUserId],
      },
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res
    .status(200)
    .json({ message: "Conversation has been successfully deleted" });
});

export {
  getAllUserConversation,
  createConversation,
  getUserConversation,
  DeleteConversation,
  UserConversations,
};

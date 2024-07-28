import asyncHandler from "express-async-handler";
import { NextFunction, Request as ExpressRequest, Response, Request } from "express";
import prisma from "../prisma";
// POST
// Create prisma. 
//  Public
const createConversation = asyncHandler(async (rew, res) => {
  const { members, isGroup, lastMessage, userId } = req.body
  const senderuserId = req.user?.userId
  // console.log(req.body, senderuserId)
 
  try {
    // find conversation
    const existingConversations = await prisma.conversations.findMany({
      where: {
        OR: [{
          userIds: {
            equals: [senderuserId, userId]
          }
        },
        {
          userIds: {
            equals: [userId, senderuserId]
          }
        },
        ]
      }
    })
    // console.log(existingConversations[0])
    if (existingConversations[0] !== undefined) {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

      res.status(200).json({ conversation: existingConversations[0] })
    } else {
      const conversationdata = {
        lastMessage,
        isGroup,
        users: {
          connect: [
            // sender ids tc come first since he is the one sending it
            {
              id: senderuserId
            },
            {
              id: userId
            },

          ]
        },

      }

      const newConversation = await prisma.conversations.create({
        data: conversationdata,
        include: {
          users: true,
        }
      })

      res.setHeader("Content-Type", "text/html");
      res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

      res.status(200).json({ conversation: newConversation })
    }
    // return conversation if true
    // create conversation if it doesnt exist
  } catch (error) {
    res.status(401).json({ message: error?.data })
  }

});

// GET Review of the user conversation
//  Public
// send the conversation Id only
const getUserConversation = asyncHandler(async (rew, res) => {
  // get the conversation id form the req params
  const userId = req.params.id
  const currentUserId = req.user?.userId 
  //  find a unique document containiung the convo id
  const conversation = await prisma.conversations.findMany({
    where: {
      OR: [
        {
          userIds: {
            equals: [userId, currentUserId]
          }
        },
        {
          userIds: {
            equals: [currentUserId, userId]
          }
        },
      ]
    }
  })

  if (conversation[0] !== undefined) {
    res.status(200).json({ conversation: conversation[0] })

  } else {
    res.status(200).json({ conversation: null })
  }


});

// GET All Gig
//  Public
const DeleteConversation = asyncHandler(async (rew, res) => {


  // get the request body
  const curentUserId = req?.user?.userId

  const conversation = await prisma.conversations.findUnique({
    where: {
      id: req.params.id
    },
    include: {
      users: true
    }
  })
  if (!conversation) {
    res.status(404);
    throw new Error("No such conversation exists");
  }

  await prisma.conversations.deleteMany({
    where: {
      id: req.params.id,
      userIds: {
        hasSome: [curentUserId]
      }
    },
  })
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ message: 'Conversation has been successfully deleted' })
});


export {
  createConversation,
  getUserConversation,
  DeleteConversation,
};
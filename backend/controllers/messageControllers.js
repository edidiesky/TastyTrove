import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
// Create Message
//  Public
const createMessage = asyncHandler(async (req, res) => {
  // get the body message
  const conversationId = req.params.id
  // console.log(conversationId)
  const senderId = req.user?.userId
  const { body, image } = req.body
   // create the message

  const message = await prisma.message.create({
    data: {
      body,
      image,
      seen: {
        connect: {
          id: senderId
        }
      },
      sender: {
        connect:
          { id: senderId }

      },
      conversation: {
        connect: {
          id: conversationId
        }
      }
    },
    include: {
      sender: true,
    }
  })
  //  update the conversation
  await prisma.conversations.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageAt: new Date(),
      lastMessage: body,
    },
    include: {
      users: true,
    },
  });


  //  send the message

  res.status(200).json({ message })

})

// GET
// GET All Message
//  Public
const getAllMessageofAConversation = asyncHandler(async (req, res) => {
  
  // get the conversation id form the req params
  const conversatonId = req.params.conversationid
  // console.log(conversatonId)
  //  find a unique document containiung the convo id
  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversatonId
    },
    include:{
      seen:true,
      sender:true
    },
    orderBy:{
      createdAt:"asc"
    }
  })

  res.status(200).json({ messages })
});


// GET All Message
//  Public
const DeleteMessage = asyncHandler(async (req, res) => {

});

const UpdateMessage = asyncHandler(async (req, res) => {

});

export {
  createMessage,
  DeleteMessage,
  getAllMessageofAConversation,
  UpdateMessage,
};
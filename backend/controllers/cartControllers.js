import asyncHandler from "express-async-handler";
import { parse, formatISO } from "date-fns";
import prisma from "../prisma/index.js";
const GetUserCart = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.cart.findMany({
    where: {
      userid: req.user.userId,
    },
    include: {
      user: true,
      menu: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});

const GetAllCart = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.cart.findMany({
    include: {
      user: true,
      menu: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});
const GetSingleCart = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.cart.findUnique({
    where: {
      userid: req.user.userId,
      id: req.params.id,
    },
    include: {
      user: true,
      menu: true,
    },
  });
  return res.json(availableRooms);
});

const CreateUserCart = asyncHandler(async (req, res) => {
  let { startDate, endDate, totalPrice, guests } = req.body;
  const id = req.params.id;
  startDate = formatISO(parse(startDate, "MMMM do yyyy", new Date()));
  endDate = formatISO(parse(endDate, "MMMM do yyyy", new Date()));
  // check for available menu
  const availableRooms = await prisma.cart.findMany({
    where: {
      roomid: id,
      OR: [
        {
          AND: [
            { startDate: { lte: startDate } },
            { endDate: { gte: startDate } },
          ],
        },
        {
          AND: [{ startDate: { lte: endDate } }, { endDate: { gte: endDate } }],
        },
      ],
    },
  });

  if (availableRooms.length > 0) {
    res.status(404);
    throw new Error("Room has alrady been booked");
  }

  // Book the room
  const CartData = {
    startDate,
    endDate,
    totalPrice,
    userid: req.user.userId,
    roomid: id,
    status: "PENDING",
    guests: guests,
  };

  const newCart = await prisma.cart.create({
    data: CartData,
  });

  await prisma.menu.update({
    where: { id },
    data: {
      cart: {
        connect: { id: newCart?.id },
      },
    },
  });

  return res.json(newCart);
});
const DeleteCart = asyncHandler(async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!cart) {
    res.status(404);
    throw new Error("The cart does not exist");
  }
  await prisma.payment.deleteMany({
    where: { Cartid: req.params.id },
  });
  await prisma.cart.delete({
    where: { id: req.params.id },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res
    .status(200)
    .json({ msg: "The cart has been successfully deleted" });
});

const UpdateCarts = asyncHandler(async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!cart) {
    res.status(404);
    throw new Error("The cart does not exist");
  }

  let UpdatedCarts = await prisma.cart.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
    },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({
    msg: "The cart has been successfully deleted",
    Cart: UpdatedCarts,
  });
});
export {
  GetUserCart,
  GetAllCart,
  CreateUserCart,
  GetSingleCart,
  DeleteCart,
  UpdateCarts,
};

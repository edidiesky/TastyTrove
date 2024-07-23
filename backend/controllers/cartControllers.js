import asyncHandler from "express-async-handler";
import { parse, formatISO } from "date-fns";
import prisma from "../prisma/index.js";
const GetUserCart = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.cart.findMany({
    where: {
      userid: req.user.userId,
    },
    include: {
      // user: true,
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
  const id = req.params.id;

  const session = await prisma.$transaction(async (prisma) => {
    // check if the menu exists in the cart
    // if it exists update the cart
    // if it does not exist go unto create a new cart for the user and update the menu data

    // find the menu in the cart to check if it exists
    const existingCartItem = await prisma.cart.findFirst({
      where: { menuid: id },
    });
    if (existingCartItem) {
      const { totalCount, totalPrice } = req.body;
      const newCart = await prisma.cart.update({
        where: {
          id: existingCartItem?.id,
        },
        data: {
          totalPrice: totalPrice,
          userid: req.user.userId,
          menuid: id,
          status: "PENDING",
          totalCount: totalCount,
        },
      });
      // console.log(menu);

      return { newCart };
    } else {
      const { totalCount, totalPrice } = req.body;
      const menu = await prisma.menu.findUnique({
        where: { id: id },
      });
      // check if the menu exists
      if (!menu) {
        res.status(404);
        throw new Error("The menu does not exist");
      }
      // check if the menu avalability count is less than the request body count Stock
      if (menu.availabilityCount < totalCount) {
        res.status(400);
        throw new Error("Insufficient availability");
      }
      await prisma.menu.update({
        where: { id },
        data: {
          availabilityCount: menu.availabilityCount - totalCount,
          servedCount: totalCount,
        },
      });

      const newCart = await prisma.cart.create({
        data: {
          totalPrice: totalPrice,
          userid: req.user.userId,
          menuid: id,
          status: "PENDING",
          totalCount: totalCount,
        },
      });
      // console.log(menu);

      return { newCart };
    }
  });

  return res.json(session);
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
    where: { cartId: req.params.id },
  });
  await prisma.cart.delete({
    where: { id: req.params.id },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The cart has been successfully deleted" });
});

const UpdateCart = asyncHandler(async (req, res) => {
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
  UpdateCart,
};

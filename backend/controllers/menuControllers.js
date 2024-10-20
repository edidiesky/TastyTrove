import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import redisClient from "../utils/redisClient.js";

// @description  Get all menu
// @route  GET /menu
// @access  Public
const GetAllMenu = asyncHandler(async (req, res) => {
  // setting the cache key for getting all the menus
  const cacheKey = "allMenus";
  // getting the data from redis based on the cache key
  const cachedMenus = await redisClient.get(cacheKey);
  if (cachedMenus) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(JSON.parse(cachedMenus));
  } else {
    const Menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    // setting the cached data to expire in an hour
    await redisClient.set(cacheKey, JSON.stringify(Menus), { EX: 3600 });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(Menus);
  }
});

const GetAllMenuAndReservations = asyncHandler(async (req, res) => {});

// @description  Get a seller menu
// @route  GET /menu/13344
// @access  Private
const GetAllAdminMenus = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 4;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalMenu = await prisma.menu.count({});
  const cacheKey = "allMenus";
  // getting the data from redis based on the cache key
  const cachedMenus = await redisClient.get(cacheKey);
  if (cachedMenus) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(JSON.parse(cachedMenus));
  } else {
    const Menus = await prisma.menu.findMany({
      skip: skip,
      take: limit,
      where: {
        userid: req.user?.userId,
      },
      include: {
        user: true,
      },
    });

    const noOfPages = Math.ceil(totalMenu / limit);
    const menuResult = { Menus, noOfPages, totalMenu };
    await redisClient.set(cacheKey, JSON.stringify(menuResult), { EX: 3600 });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

    res.status(200).json(menuResult);
  }
});

// @description  Create a menu for the seller
// @route  POST /menu
// @access  Private
const CreateMenus = asyncHandler(async (req, res) => {
  const { title, image, description, price, category } = req.body;
  // check for empty fields
  if (!title || !image || !description || !price || !category) {
    res.status(404);
    throw new Error("Please provide the necessary menu requirement");
  } else {
    const Menu = await prisma.menu.create({
      data: {
        userid: req.user?.userId,
        ...req.body,
      },
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(Menu);
  }
});

// @description  Get a single menu for the user
// @route  GET /menu/34545
// @access  Public
const GetSingleMenu = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const cacheKey = `menu_${id}`;
  // get the menu
  const cachedMenus = await redisClient.get(cacheKey);
  if (cachedMenus) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(JSON.parse(cachedMenus));
  } else {
    const Menu = await prisma.menu.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!Menu) {
      res.status(404);
      throw new Error("The Menu does not exist");
    }
    await redisClient.set(cacheKey, JSON.stringify(Menu), { EX: 3600 });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(Menu);
  }
});

// @description  Update a menu for the seller
// @route  PUT /menu/4566
// @access  Private
const UpdateMenu = asyncHandler(async (req, res) => {
  const updateMenu = await prisma.menu.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updateMenu });
});

// @description  Delete a menu for the seller
// @route  DELETE /menu/4566
// @access  Private
const DeleteMenu = asyncHandler(async (req, res) => {
  const Menus = await prisma.menu.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!Menus) {
    res.status(404);
    throw new Error("The Menus does not exist");
  }
  await prisma.menu.delete({
    where: { id: req.params.id },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The Menus has been successfully deleted" });
});

// @description  Get all menu for the seller
// @route  PUT /menu/admin
// @access  Private

const GetSellerMenus = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalMenu = await prisma.menu.count({});

  const Menus = await prisma.menu.findMany({
    where: {
      userid: req.user.userId,
    },
    skip: skip,
    take: limit,
  });

  const noOfPages = Math.ceil(totalMenu / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ Menus, noOfPages, totalMenu });
});
export {
  GetAllMenu,
  GetAllMenuAndReservations,
  CreateMenus,
  GetSingleMenu,
  DeleteMenu,
  GetAllAdminMenus,
  UpdateMenu,
};

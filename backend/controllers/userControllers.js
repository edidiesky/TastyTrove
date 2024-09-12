import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";
// @description  Get a single user for the admni
// @route  POST /user/:id
// @access  Private
const GetUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ user });
});

// @description  Get a single user profile
// @route  POST /user/:id
// @access  Public
const GetUsersProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ user });
});

// @description  Update a single user profile
// @route  PUT /user/:id
// @access  Public
const UpdateUser = asyncHandler(async (req, res) => {
  const updatedUser = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updatedUser });
});

// @description  Update a single user profile
// @route  PUT /user/:id
// @access  Private
const AdminUpdateUser = asyncHandler(async (req, res) => {
  const { password, ...rest } = req.body;
  let hashedPassword;
  // console.log(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  const updatedUser = await prisma.user.update({
    where: { id: req.params.id },
    data: { ...(hashedPassword && { hashedPassword }), ...rest },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ user:updatedUser });
});
// @description  Delete a single user profile
// @route  DELETE /user/:id
// @access  Private
const DeleteUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The user has been successfully deleted" });
});

// @description  GET user profile
// @route  GET /user/
// @access  Private
const GetAllUser = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalUser = await prisma.user.count({});

  const user = await prisma.user.findMany({
    skip: skip,
    take: limit,
  });

  const noOfPages = Math.ceil(totalUser / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ user, noOfPages, totalUser });
});

export {
  GetUserById,
  GetAllUser,
  UpdateUser,
  DeleteUser,
  AdminUpdateUser,
  GetUsersProfile,
};

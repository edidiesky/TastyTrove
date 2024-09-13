import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

// @description  Logout a  User
// @route  POST /auth/logout
// @access  Public
const LogoutUser = asyncHandler(async (req, res) => {
  // console.log(token);
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
});

// @description  Register a new User
// @route  POST /auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, hashedPassword, username } = req.body;
  //
  if (!email || !hashedPassword || !name) {
    res.status(404);
    throw new Error("Please fill in the valid credentails");
  }
  // check if the user exist
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    res.status(404);
    throw new Error("The user does exist");
  }

  const verificationToken = Math.floor(9000 * Math.random() + 1000).toString();
  const verifiedTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  // console.log(verifiedTokenExpiresAt);

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.hashedPassword, salt);
  const Tempuser = {
    email,
    hashedPassword: hashedpassword,
    name,
    username,
    verifiedTokenExpiresAt,
    verifiedToken: verificationToken,
  };
  const user = await prisma.user.create({
    data: Tempuser,
  });
  // sendVerificationEmail(email, verificationToken);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  const { hashedPassword: _, ...userWithoutPassword } = user;
  res.status(200).json({
    user: userWithoutPassword,
  });
});

// @description  Login a new User
// @route  POST /auth/login
// @access  Public
const LoginUser = asyncHandler(async (req, res) => {
  const { email, hashedPassword } = req.body;
  if (!email || !hashedPassword) {
    res.status(404);
    throw new Error("Please fill in the valid credentails");
  }
  // Find the user in the database

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!userExist) {
    res.status(404);
    throw new Error("You do not have any record with us!!!");
  }
  const verifyPassword = await bcrypt.compare(
    hashedPassword,
    userExist.hashedPassword
  );
  if (!verifyPassword) {
    res.status(404);
    throw new Error("Please provide a valid Password!!");
  }

  if (userExist) {
    generateToken(res, userExist?.id);
  }
  // sendVerificationEmail(email, verificationToken);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  const { hashedPassword: _, ...userWithoutPassword } = userExist;
  res.status(200).json({
    user: userWithoutPassword,
  });
});

// @description  Set a user role to seller
// @route  POST /auth/becomeASeller
// @access  Public
const BecomeASeller = asyncHandler(async (req, res) => {
  // cehck if the user exists
  //  if he exists just update the role to seller
  //  if not create a record for the user

  const { email, hashedPassword, country, city, username, name, image } =
    req.body;
  if (
    !email ||
    !hashedPassword ||
    !country ||
    !city ||
    !username ||
    !name ||
    !image
  ) {
    res.status(404);
    throw new Error("Please fill in the valid credentails");
  }
  // Find the user in the database

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExist) {
    const user = await prisma.user.update({
      where: { id: userExist?.id },
      data: { role: "SELLER" },
    });
      const { hashedPassword: _, ...userWithoutPassword } = user;
    generateToken(res, user?.id);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.status(200).json({ user: userWithoutPassword });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.hashedPassword, salt);
    const Tempuser = {
      email,
      hashedPassword: hashedpassword,
      country,
      city,
      username,
      name,
      image,
      role: "SELLER",
    };
    const user = await prisma.user.create({
      data: Tempuser,
    });

    generateToken(res, user?.id);
    // sendVerificationEmail(email, verificationToken);

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    const { hashedPassword: _, ...userWithoutPassword } = user;
    res.status(200).json({
      user: userWithoutPassword,
    });
  }
});

// @description
//  POST Verify the email of the user
const VerifyEmail = asyncHandler(async (req, res) => {
  // get the code
  const { code } = req.body;
  // find the user with the code
  const user = await prisma.user.findUnique({
    where: {
      verifiedToken: code,
      verifiedTokenExpiresAt: { gte: Date.now() },
    },
  });

  // check if the code has not been expired
  if (!user) {
    res.status(404);
    throw new Error("The verfication code has been expired");
  }
  // update the user
  const updatedUser = await prisma.user.update({
    where: {
      id: user?.id,
      emailVerified: true,
      verifiedToken: null,
      verifiedTokenExpiresAt: null,
    },
  });

  res.status(200).json({ user: updatedUser });
});
// @description
//  POST Verify the email of the user
const ResetPassword = asyncHandler(async (req, res) => {});

export {
  registerUser,
  LoginUser,
  BecomeASeller,
  ResetPassword,
  VerifyEmail,
  LogoutUser,
};

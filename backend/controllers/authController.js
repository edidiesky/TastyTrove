import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";

//register user
// Not Private
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
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.hashedPassword, salt);
  const Tempuser = {
    email,
    hashedPassword: hashedpassword,
    name,
    username,
    isAdmin: false,
  };
  const user = await prisma.user.create({
    data: Tempuser,
  });
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    process.env.JWT_CODE,
    { expiresIn: "12d" }
  );

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  //  await delete user?.hashedPassword
  res.cookie("accessToken", token, {
    httpOnly: true,

    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });
  res.status(200).json({ user, token });
});

//Login the  user
// Not Private
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

  //
  const token = jwt.sign(
    {
      userId: userExist.id,
    },
    process.env.JWT_CODE,
    { expiresIn: "12d" }
  );

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.cookie("accessToken", token, {
    httpOnly: true,

    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    domain: "localhost", // or your specific domain
    path: "/", // root path
    secure: false, // if your site uses HTTPS

    // withcredential: true
  });
  res.status(200).json({ user: userExist, token });
});

export { registerUser, LoginUser };

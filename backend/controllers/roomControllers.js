import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
const GetAllRoom = asyncHandler(async (req, res) => {
  const rooms = await prisma.rooms.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(rooms);
});

const GetAllRoomAndReservations = asyncHandler(async (req, res) => {
  const rooms = await prisma.rooms.findMany({
    include: {
      reservations: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(rooms);
});
const GetAllAdminRooms = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalRoom = await prisma.rooms.count({});

  const rooms = await prisma.rooms.findMany({
    skip: skip,
    take: limit,
  });

  const noOfPages = Math.ceil(totalRoom / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ rooms, noOfPages, totalRoom });
});
const CreateRooms = asyncHandler(async (req, res) => {
  const room = await prisma.rooms.create({
    data: {
      userid: req.user?.userId,
      ...req.body,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(room);
});

const GetSingleRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const room = await prisma.rooms.findUnique({
    where: {
      id: id,
    },
  });

  if (!room) {
    return NextResponse.json(
      { message: "No room has being found" },
      { status: 404 }
    );
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(room);
});
const UpdateRoom = asyncHandler(async (req, res) => {
  const updateRoom = await prisma.rooms.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updateRoom });
});
const DeleteRoom = asyncHandler(async (req, res) => {
  const rooms = await prisma.rooms.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!rooms) {
    res.status(404);
    throw new Error("The rooms does not exist");
  }
  await prisma.rooms.delete({
    where: { id: req.params.id },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The rooms has been successfully deleted" });
});
export {
  GetAllRoom,
  GetAllRoomAndReservations,
  CreateRooms,
  GetSingleRoom,
  DeleteRoom,
  GetAllAdminRooms,
  UpdateRoom,
};

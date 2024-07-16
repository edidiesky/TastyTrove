import asyncHandler from "express-async-handler";
import { parse, formatISO } from "date-fns";
import prisma from "../prisma/index.js";
const GetUserReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findMany({
    where: {
      userid: req.user.userId,
    },
    include: {
      user: true,
      rooms: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});

const GetAllReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findMany({
    include: {
      user: true,
      rooms: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});
const GetSingleReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findUnique({
    where: {
      userid: req.user.userId,
      id: req.params.id,
    },
    include: {
      user: true,
      rooms: true,
    },
  });
  return res.json(availableRooms);
});

const CreateUserReservation = asyncHandler(async (req, res) => {
  let { startDate, endDate, totalPrice, guests } = req.body;
  const id = req.params.id;
  startDate = formatISO(parse(startDate, "MMMM do yyyy", new Date()));
  endDate = formatISO(parse(endDate, "MMMM do yyyy", new Date()));
  // check for available rooms
  const availableRooms = await prisma.reservations.findMany({
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
  const reservationData = {
    startDate,
    endDate,
    totalPrice,
    userid: req.user.userId,
    roomid: id,
    status: "PENDING",
    guests: guests,
  };

  const newReservation = await prisma.reservations.create({
    data: reservationData,
  });

  await prisma.rooms.update({
    where: { id },
    data: {
      reservations: {
        connect: { id: newReservation?.id },
      },
    },
  });

  return res.json(newReservation);
});
const DeleteReservations = asyncHandler(async (req, res) => {
  const reservations = await prisma.reservations.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!reservations) {
    res.status(404);
    throw new Error("The reservations does not exist");
  }
  await prisma.payment.deleteMany({
    where: { reservationid: req.params.id },
  });
  await prisma.reservations.delete({
    where: { id: req.params.id },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res
    .status(200)
    .json({ msg: "The reservations has been successfully deleted" });
});

const UpdateReservations = asyncHandler(async (req, res) => {
  const reservations = await prisma.reservations.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!reservations) {
    res.status(404);
    throw new Error("The reservations does not exist");
  }

  let UpdatedReservations = await prisma.reservations.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
    },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({
    msg: "The reservations has been successfully deleted",
    reservation: UpdatedReservations,
  });
});
export {
  GetUserReservation,
  GetAllReservation,
  CreateUserReservation,
  GetSingleReservation,
  DeleteReservations,
  UpdateReservations,
};

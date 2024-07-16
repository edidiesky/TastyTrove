// import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";

// User
const CreatePayment = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { reservationid, amount, currency } = req.body;

  // create payment history for the user
  const payment = await prisma.payment.create({
    data: {
      amount,
      currency,
      userid: userId,
      reservationid: reservationid,
    },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});

const GetPaymentHistoryForAdmin = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const payment = await prisma.payment.findMany({
    include: {
      user: true,
      reservation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});

const GetSinglePaymentDetails = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body

  const payment = await prisma.payment.findUnique({
    where: {
      id: req.params.id,
      userid: req.user?.userId,
    },
    include: {
      user: true,
      reservation: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});

const UpdatePaymentToFailed = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.body;
  const payment = await prisma.payment.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: "CANCELLED",
    },
    include: {
      user: true,
      reservation: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});
const UpdatePaymentToSuccess = expressAsyncHandler(async (req, res) => {
  const { reservationid, amount, currency } = req.body;
  const paymentId = req.params.id;

  // Update the payment status to "CONFIRMED"
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "CONFIRMED" },
    include: {
      user: true,
    },
  });

  // Find the reservation
  const reservation = await prisma.reservations.findFirst({
    where: {
      userid: req.user.userId,
      id: reservationid,
    },
  });

  if (reservation) {
    // Update the reservation status using the unique `id`
    const updatedReservation = await prisma.reservations.update({
      where: { id: reservation.id },
      data: { status: "CONFIRMED" },
      include: {
        rooms: true,
      },
    });

    res.status(200).json({ payment, updatedReservation });
  } else {
    res.status(404).json({ message: "Reservation not found" });
  }
});

export {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
};

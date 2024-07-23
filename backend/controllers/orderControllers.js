// import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";

// User
const CreatePayment = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { cartItems, amount, currency } = req.body;

  // create payment history for the user
  const payment = await prisma.payment.create({
    data: {
      amount,
      currency,
      userid: userId,
      cartItems: cartItems,
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
  const payment = await prisma.$transaction(async (prisma) => {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "CONFIRMED" },
      include: {
        user: true,
      },
    });
    // check if the user has a cart
    const cart = await prisma.cart.findMany({
      where: { userid: req.user?.userId },
    });
    if (cart?.length > 0) {
      // delete the user cart
      await prisma.cart.deleteMany({
        where: { userid: req.user?.userId },
      });
      // will display message in the future
      return payment;
    } else {
      return {payment};
    }
  });
  res.status(200).json(payment);
});

export {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
};

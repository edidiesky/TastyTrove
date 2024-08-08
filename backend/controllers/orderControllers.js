// import Product from "../models/Product.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";
const MAX_RETRIES = 3;
const CreateSellerCartPayment = async (cartItems,amount, userId, currency) => {
  //  group the cart Items by the seller Id
  // generate a unique Id for a single payment
  const paymentGroupId = uuidv4();
  const sellersCart = cartItems.reduce((acc, item) => {
    const sellerId = item?.menu?.userid;
    if (!acc[sellerId]) {
      acc[sellerId] = [];
    }
    acc[sellerId].push(item);
    return acc;
  }, {});

  const createSellersPayment = Object.entries(sellersCart).map(
    async ([sellerId, cart]) => {
      // get the total price
      const totalPrice = cart?.reduce((acc, item) => {
        acc += item?.totalPrice;
        return acc;
      }, 0);
      // create the payment
      await prisma.payment.create({
        data: {
          amount: totalPrice,
          currency,
          userid: userId,
          sellerId: sellerId,
          cartItems: cart,
          paymentGroupId: paymentGroupId,
          salesamount: amount,
        },
      });

      return paymentGroupId;
    }
  );
  // Create a payment for the sellers based on their cart items
  // return sellersCart;
  // return
  return Promise.all(createSellersPayment);
};

// User
const CreatePayment = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { cartItems, amount, currency } = req.body;
  const payment = await CreateSellerCartPayment(cartItems,amount, userId, currency);
  // console.log(payment[0]);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ paymentid: payment[0] });
});

const GetPaymentHistoryForAdmin = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const payment = await prisma.payment.findMany({
    include: {
      user: true,
    },
    // where:{

    // },
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
  // let attempt = 0;
  // // Update the payment status to "CONFIRMED"
  // while (attempt < MAX_RETRIES) {
  //   try {
  //     const payment = await prisma.$transaction(async (prisma) => {
  //       const payment = await prisma.payment.updateMany({
  //         where: { paymentGroupId: paymentId },
  //         data: { status: "CONFIRMED" },
  //       });
  //       // check if the user has a cart
  //       const cart = await prisma.cart.findMany({
  //         where: { userid: req.user?.userId },
  //       });
  //       if (cart?.length > 0) {
  //         // delete the user cart
  //         await prisma.cart.deleteMany({
  //           where: { userid: req.user?.userId },
  //         });
  //       }

  //       return { payment };
  //     });

  //     res.status(200).json(payment);
  //   } catch (error) {
  //     if (
  //       error.code === "P2034" ||
  //       error?.message.includes(
  //         "Transaction failed due to a write conflict or a deadlock"
  //       )
  //     ) {
  //       attempt++;
  //       if (attempt >= MAX_RETRIES) {
  //         console.error(
  //           "Max retries reached. Could not complete the transaction."
  //         );
  //         return res.status(500).json({ message: "Internal server error" });
  //       } else {
  //         console.error(error);
  //         return res.status(500).json({ message: "Internal server error" });
  //       }
  //     }
  //   }
  // }
  await prisma.payment.updateMany({
    where: { paymentGroupId: paymentId },
    data: { status: "CONFIRMED" },
  });
  const updatedPaymentRecords = await prisma.payment.findMany({
    where: { paymentGroupId: paymentId },
  });
  // console.log(updatedPaymentRecords);
  // check if the user has a cart
  const cart = await prisma.cart.findMany({
    where: { userid: req.user?.userId },
  });
  if (cart?.length > 0) {
    // delete the user cart
    await prisma.cart.deleteMany({
      where: { userid: req.user?.userId },
    });
  }

  res.status(200).json({ payment: updatedPaymentRecords });
});

export {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
};

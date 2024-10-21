// import Product from "../models/Product.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";
import redis from "../utils/redis.js";

// @description  Distribute the payment to the separate sellers
// @route  POST /order
// @access  Public
const CreateSellerCartPayment = async (
  cartItems,
  amount,
  userId,
  currency,
  ShippingInformation
) => {
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
          ShippingInformation: ShippingInformation,
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

// @description  Create the payment to the separate sellers
// @route  POST /order
// @access  Public
const CreatePayment = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { cartItems, amount, currency, ShippingInformation } = req.body;
  const payment = await CreateSellerCartPayment(
    cartItems,
    amount,
    userId,
    currency,
    ShippingInformation
  );
  // console.log(payment[0]);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ paymentid: payment[0] });
});

// @description  Get a seller order
// @route  GET /order/history
// @access  Private
const GetPaymentHistoryForAdmin = expressAsyncHandler(async (req, res) => {
  const { limit = 6, page = 1 } = req.query;
  // setting the cache key for getting all the menus
  const cacheKey = `admin_order_${req.user.userId}`;
  // getting the data from redis based on the cache key
  const cachedorders = await redis.get(cacheKey);
  // calculate the pagination
  const skip = (page - 1) * limit;
  if(cachedorders) {
    return res.json(cachedorders);
  } else {
    // instantiate the form data from the request body
    const payment = await prisma.payment.findMany({
      where: {
        sellerId: req.user.userId,
      },
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const totalPayment = await prisma.payment.count({});
    const noOfPages = Math.ceil(totalPayment / limit);
    const result = { payment, noOfPages, totalPayment };
    await redis.set(cacheKey, result, { EX: 3600 });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

    res.status(200).json(result);
  }

});

// @description  Get a single payment details
// @route  GET /order/history/46484489
// @access  Public
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

// @description  Update a single payment details to failed when the flutterWave payment is not complete
// @route  PUT /order/history/failed/46484489
// @access  Public
const UpdatePaymentToFailed = expressAsyncHandler(async (req, res) => {
  const paymentId = req.params.id;

  // Update the payment status
  const payment = await prisma.payment.updateMany({
    where: {
      paymentGroupId: paymentId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  // Fetch the updated payment records
  const updatedPaymentRecords = await prisma.payment.findMany({
    where: { paymentGroupId: paymentId },
  });

  // Update menu availability and served count
  const menuUpdates = updatedPaymentRecords.map(async ({ cartItems }) => {
    const updates = cartItems.map(async ({ menuid, totalCount }) => {
      // get the menu
      const menu = await prisma.menu.findFirst({
        where: { id: menuid },
      });
      if (!menu) {
        res.status(404);
        throw new Error("Such Menu do not exist");
      }
      return await prisma.menu.update({
        where: { id: menu?.id },
        data: {
          availabilityCount: menu?.availabilityCount - totalCount,
          servedCount: menu?.servedCount - totalCount,
        },
      });
    });
    return Promise.all(updates);
  });
  const updatedMenus = Promise.all(menuUpdates);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({
    updatedMenus,
  });
});

// @description  Update a single payment details to success when the flutterWave payment is completed
// @route  PUT /order/history/success/46484489
// @access  Public
const UpdatePaymentToSuccess = expressAsyncHandler(async (req, res) => {
  const paymentId = req.params.id;
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

// @description  Update a single payment details to delivered when the seller has confirmaed delivery
// @route  PUT /order/history/delivery/success/46484489
// @access  Private
const UpdatePaymentToDelivered = expressAsyncHandler(async (req, res) => {
  const paymentId = req.params.id;
  const updatedPaymentRecords = await prisma.payment.updateMany({
    where: { paymentGroupId: paymentId },
    data: { deliverystatus: "DELIVERED" },
  });
  res.status(200).json({ payment: updatedPaymentRecords });
});
export {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
  UpdatePaymentToDelivered,
};

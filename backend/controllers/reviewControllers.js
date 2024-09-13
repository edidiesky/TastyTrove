// import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";

// @description  Create review for the user
// @route  POST /review
// @access  Public
const CreateReview = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { review, description, sellerId, menuid } = req.body;
  // get all the seller reviews

  // total Seller Rating

  // get all the seller's memu
  // const allSellerMenu = await prisma.menu.findMany({
  //   where: {
  //     userid: sellerId,
  //   },
  // });

  // check if the user has reviewed the menu item before
  const userreviews = await prisma.review.findMany({
    where: {
      userid: userId,
      menuid: menuid,
      sellerId: sellerId,
    },
  });
  // console.log(totalSellerRating);
  if (userreviews?.length !== 0) {
    res.status(404);
    throw new Error("You have already reviewed this product");
  } else {
    // create review history for the user
    // const { reviews } = await prisma.$transaction(async (primsa) => {
    //   const reviews = await prisma.review.create({
    //     data: {
    //       review,
    //       description,
    //       menuid: menuid,
    //       userid: userId,
    //       sellerId: sellerId,
    //     },
    //   });
    //   // const allSellerReview = await prisma.review.findMany({
    //   //   where: {
    //   //     sellerId: sellerId,
    //   //   },
    //   // });
    //   // // calculate the total rating
    //   // const TotalRating = allSellerReview?.reduce(
    //   //   (acc, item) => item.review + acc,
    //   //   0
    //   // );
    //   // // console.log(TotalRating / allSellerReview?.length);
    //   // let totalSellerRating = TotalRating / allSellerReview?.length;

    //   // // console.log(TotalRating);
    //   // // update the seller review
    //   // const seller = await prisma.user.update({
    //   //   where: {
    //   //     id: sellerId,
    //   //   },
    //   //   data: {
    //   //     ratings: totalSellerRating,
    //   //   },
    //   // });
    //   return {
    //     reviews,
    //   };
    // });
    const reviews = await prisma.review.create({
      data: {
        review,
        description,
        menuid: menuid,
        userid: userId,
        sellerId: sellerId,
      },
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

    res.status(200).json({
      review: reviews,
    });
  }
});

// @description  Get review for the seller
// @route  GET /review/seller
// @access  Private
const GetReviewHistoryForAdmin = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const review = await prisma.review.findMany({
    where: {
      sellerId: req.user.userId,
    },
    include: {
      user: true,
      menu: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ review });
});
// @description  Get review for a menu
// @route  GET /review/456474849
// @access  Public
const GetMenuReview = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body

  const review = await prisma.review.findMany({
    where: {
      menuid: req.params.id,
    },
    include: {
      user: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ review });
});

export { CreateReview, GetReviewHistoryForAdmin, GetMenuReview };

import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { format } from "date-fns";
import moment from "moment";
const TopSellingProduct = async (sellerid) => {
  const topProduct = await prisma.menu.findMany({
    where: { userid: sellerid },
    orderBy: {
      servedCount: "desc", // Order by servedCount in descending order
    },
    take: 5,
  });
  return topProduct;
};
const SellerRecentSales = async (sellerid) => {
  const recentsales = await prisma.payment.findMany({
    where: { sellerId: sellerid },
    include: { user: true },
    take: 4,
  });
  return recentsales;
};

const SellerWidgetData = async (sellerid, payment) => {
  // get total clients
  const uniqueUserIds = new Set();
  payment.forEach(async (sale) => {
    uniqueUserIds.add(sale.userid);
  });
  const clients = payment?.map((sales) => {
    return sales.userid;
  });
  // get total Sales
  const recentsales = await prisma.payment.findMany({
    where: { sellerId: sellerid },
  });
  // get total Menu
  const menu = await prisma.menu.findMany({
    where: { userid: sellerid },
  });
  // get total reviews
  const reviews = await prisma.review.findMany({
    where: { sellerId: sellerid },
  });

  const widgetData = {
    totalSales: recentsales?.length,
    totalMenu: menu?.length,
    totalReview: reviews,
    totalClients: clients,
  };
  return widgetData;
};

const fetchRecentSales = async (sellerid) => {
  const recentsales = await prisma.payment.findMany({
    where: { sellerId: sellerid },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return recentsales;
};

const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const sellerid = req?.user?.userId;
  const topproduct = await TopSellingProduct(sellerid);
  const recentsales = await SellerRecentSales(sellerid);

  const recentPayment = await fetchRecentSales(sellerid);
  const widgetData = await SellerWidgetData(sellerid, recentPayment);
  res.status(200).json({
    topproduct,
    recentsales,
    widgetData,
  });
});

export { GetStatisticsDataForAdmin };

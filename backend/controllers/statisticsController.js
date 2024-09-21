import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { format } from "date-fns";
import moment from "moment";

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
const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const sellerid = req?.user?.userId;
  const start = performance.now();
  const [topproduct, recentsales] = await Promise.all([
    await prisma.menu.findMany({
      where: { userid: sellerid },
      orderBy: {
        servedCount: "desc", // Order by servedCount in descending order
      },
      take: 5,
    }),
    await prisma.payment.findMany({
      where: { sellerId: sellerid },
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    }),
    await prisma.payment.findMany({
      where: { sellerId: sellerid },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    // await SellerWidgetData(sellerid),
  ]);
  const end = performance.now();
  res.status(200).json({
    topproduct,
    recentsales,
    // widgetData,
    latency: `Total Latency - ${(end - start) / 1000} seconds`,
  });
});

export { GetStatisticsDataForAdmin };

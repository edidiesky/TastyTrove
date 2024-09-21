import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { format } from "date-fns";
import moment from "moment";

const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const sellerid = req?.user?.userId;
  const start = performance.now();
  const [topproduct, recentsales, totalMenu, totalReview] = await Promise.all([
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
    }),
    await prisma.menu.findMany({
      where: { userid: sellerid },
    }),
    await prisma.review.findMany({
      where: { sellerId: sellerid },
    }),
    // await SellerWidgetData(sellerid),
  ]);
  const end = performance.now();
  // get total clients
  const uniqueUserIds = new Set();
  const clients = recentsales.forEach(async (sale) => {
    uniqueUserIds.add(sale.userid);
  });

  res.status(200).json({
    topproduct,
    recentsales,
    widgetData: {
      totalClients: clients,
      totalReview,
      totalMenu: totalMenu?.length,
      totalSales: recentsales?.length,
    },
    latency: `Total Latency - ${(end - start) / 1000} seconds`,
  });
});

export { GetStatisticsDataForAdmin };

import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { format } from "date-fns";
import moment from "moment";
import redis from "../utils/redis.js";
const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const sellerid = req?.user?.userId;
  const cacheKey = `seller:${sellerid}`;
  // get the cached value
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(cachedData);
  } else{
      const start = performance.now();
      const [topproduct, recentsales, totalMenu, totalReview, completedOrder] =
        await Promise.all([
          prisma.menu.findMany({
            where: { userid: sellerid },
            orderBy: { servedCount: "desc" },
            take: 5,
            select: {
              title: true,
              servedCount: true,
            },
          }),
          prisma.payment.findMany({
            where: { sellerId: sellerid },
            include: { user: true },
            orderBy: { createdAt: "desc" },
          }),
          prisma.menu.findMany({ where: { userid: sellerid } }),
          prisma.review.findMany({ where: { sellerId: sellerid } }),
          prisma.payment.findMany({
            where: { sellerId: sellerid, status: "CONFIRMED" },
            include: { user: true },
            orderBy: { createdAt: "asc" },
          }),
          prisma.payment.aggregate({
            where: { sellerId: sellerid, status: "CONFIRMED" },
            _sum: { salesamount: true },
          }),
          // await SellerWidgetData(sellerid),
        ]);
      const end = performance.now();
      // get total clients
      const uniqueUserIds = new Set(recentsales.map((sale) => sale.userid));
      const totalSales = completedOrder.reduce((acc, curr) => {
        acc += curr.salesamount;
        return acc;
      }, 0);

      // getting counting the total completed order for the month, and the totalPrice
      let orderHistory = completedOrder.reduce((acc, sales) => {
        const { amount, salesamount, createdAt } = sales;
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const key = `${month}-${year}`;
        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            salesAmount: 0,
            totalRevenue: 0,
          };
        }
        acc[key].totalRevenue += salesamount;
        acc[key].salesAmount += amount;
        return acc;
      }, {});

      orderHistory = Object.values(orderHistory).map((order) => {
        const { year, month, salesAmount, totalRevenue } = order;
        const date = moment()
          .year(year)
          .month(month + 1)
          .format("MMM Y");
        return { date, salesAmount, totalRevenue };
      });
      const result = {
        topproduct,
        recentsales,
        widgetData: {
          totalClients: clients,
          totalReview,
          totalMenu: totalMenu?.length,
          totalSales: recentsales?.length,
          totalRevenue: totalSales,
        },
        orderHistory,
        latency: `Total Latency - ${(end - start) / 1000} seconds`,
      };
      await redis.set(cacheKey, result, { EX: 3600 });
      res.status(200).json(result);
  }

});

export { GetStatisticsDataForAdmin };

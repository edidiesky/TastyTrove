import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { format } from "date-fns";
import moment from "moment";
const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const totalOrderAmount = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });
  const totalOrder = await prisma.payment.count({});
  const totalReservations = await prisma.reservations.count({});
  const totalRooms = await prisma.rooms.count({});
  const payment = await prisma.payment.findMany({
    select: {
      createdAt: true,
      amount: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const newPayment = [];
  // // payment?.map((payments) => ({
  //   period: moment(payments?.createdAt).format("MMM YYYY"),
  //   amount: payments?.amount,
  // // }))

  const stat = await prisma.payment.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
  });

  const groupedStats = stat.reduce((acc, curr) => {
    const year = curr.createdAt.getFullYear();
    const month = curr.createdAt.getMonth() + 1;
    const day = curr.createdAt.getDate();
    const key = `${day}-${month}-${year}`;
    // console.log(day);
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        day,
        count: 0,
      };
    }
    acc[key].count += curr._count._all;

    return acc;
  }, {});

    const finalStats = Object.values(groupedStats).map((stat) => {
      const date = moment()
        .year(stat.year)
        .month(stat.month - 1)
        .format("MMM Y");
      return { date, count: stat.count };
    });

  return res.json({
    finalStats,
    totalOrderAmount: totalOrderAmount?._sum?.amount,
    totalOrder: totalOrder,
    totalReservations: totalReservations,
    totalRooms: totalRooms,
  });
});

export { GetStatisticsDataForAdmin };

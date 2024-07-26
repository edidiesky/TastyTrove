import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";


const GetAllNotifications = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 6;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalNotification = await prisma.notifications.count({});

  const notifications = await prisma.notifications.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc",
      // read: true
    },
  });

  const noOfPages = Math.ceil(totalNotification / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ notifications, noOfPages, totalNotification });
});
const CreateNotifications = asyncHandler(async (req, res) => {
  const { action } = req.body
  const Notification = await prisma.notifications.create({
    data: {
      userid: req.user?.userId,
      action: action,
      read: false,

    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(Notification);
});

const UpdateNotification = asyncHandler(async (req, res) => {
  const updateNotification = await prisma.notifications.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updateNotification });
});
const DeleteNotification = asyncHandler(async (req, res) => {
  await prisma.notifications.delete({
    where: {
      read: true
    }
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The notifications has been successfully deleted" });
});
export {
  CreateNotifications,
  DeleteNotification,
  GetAllNotifications,
  UpdateNotification,
};

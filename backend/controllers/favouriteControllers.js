import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";

const CreateUserFavouriteRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const room = await prisma.rooms.findUnique({
    where: { id: id },
  });

  if (!room) {
    res.status(404);
    throw new Error("No room has been found");
  }

  // find the user

  const currentUser = await prisma.user.findUnique({
    where: {
      id: req.user?.userId,
    },
  });

  let userRoomFavourites = currentUser?.favourites
    ? currentUser?.favourites
    : [];
  const isSavedRoomIncluded = userRoomFavourites.includes(room?.id);

  if (isSavedRoomIncluded) {
    // Remove the user ID from the favourites array
    userRoomFavourites = userRoomFavourites.filter(
      (favId) => favId !== room?.id
    );
  } else {
    // Add the user ID to the favourites array
    userRoomFavourites.push(room?.id);
  }
  // const favouritesJson = JSON.stringify(favourites);
  // Update the room's favourites in the database
  const user = await prisma.user.update({
    where: { id: currentUser?.id },
    data: { favourites: userRoomFavourites },
  });

  const message = isSavedRoomIncluded
    ? `${room.title} has been removed from your collections`
    : `${room.title} has been saved to your collections`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return  res.status(200).json({
    message: message,
    favourite: !isSavedRoomIncluded,
    user: user,
  });
});

const GetUserFavouriteRooms = asyncHandler(async (req, res) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: req.user?.userId,
    },
  });

  let userRoomFavourites = currentUser?.favourites
    ? currentUser?.favourites
    : [];
  const rooms = await prisma.rooms.findMany({
    where: {
      id: { in: userRoomFavourites },
    },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return  res.status(200).json(rooms);
});
export { CreateUserFavouriteRoom, GetUserFavouriteRooms };

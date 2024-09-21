import mongoose from "mongoose";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { user } from "./data/user.js";
import { menudata } from "./data/menudata.js";
import { paymentData } from "./data/paymentData.js";
// paymentData
dotenv.config();

const prisma = new PrismaClient();
const mongoUrl = process.env.DATABASE_URL;
if (!mongoUrl) {
  throw new Error("MongoDB connection string is not defined.");
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) =>
  console.error("MongoDB connection error:", error)
);

const importData = async () => {
  try {
    // Prisma to insert our user data
    await prisma.payment.createMany({
      data: paymentData,
    });
    // await prisma.menu.createMany({
    //   data: menudata,
    // });
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();

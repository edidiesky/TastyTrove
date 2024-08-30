import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  //  console.log("Setting cookie with token:", token);
  if (!token) {
    res.status(401);
    throw new Error("User not authorized, No token");
  } else {
    try {
      const Verifiedtoken = jwt.verify(token, process.env.JWT_CODE);

      if (!Verifiedtoken) {
        res.status(403).json({ messsage: "Please provide a valid token" });
      }
      console.log(Verifiedtoken.userId);
      const { userId } = Verifiedtoken;

      req.user = { userId };
      next();
    } catch (err) {
      console.log(err);
      res.status(403).json({ messsage: "Not authorized to access this route" });
    }
  }
};

// middleware for only admin
const adminMiddleware = (req, res, next) => {
  if (!req.user && !(req.user.role === "ADMIN" || req.user.role === "SELLER")) {
    res.status(403).json({ messsage: 'You can"t acccess this route' });
  }
  next();
};

export { adminMiddleware, authMiddleware };

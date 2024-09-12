import jwt from "jsonwebtoken";

export const generateToken = (res, userid) => {
  const token = jwt.sign(
    {
      userId: userid,
    },
    process.env.JWT_CODE,
    { expiresIn: "1d" }
  );
  // console.log(token);
res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: "None", // Allows cross-origin requests
  secure: true, // Ensures the cookie is only sent over HTTPS
  expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // Adjust expiration time as needed
  path: "/",
});
};

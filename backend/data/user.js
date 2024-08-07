import bcrypt from "bcryptjs";
export const user = [
  {
    name: "Mellisa Daniel",
    username: "mellisa12",
    email: "mellisa@gmail.com",
    image:
      "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/09/melissa-darmel-200x200.jpg",
    hashedPassword: bcrypt.hashSync("12345", 10),
    experience: 20,
    location: "New York, United States",
    phone: " (555) 603-1724",
  },
  {
    name: "Laurel Deampson",
    username: "laurelDampson",
    email: "laurelDampson@gmail.com",
    hashedPassword: bcrypt.hashSync("12345", 10),
    experience: 20,
    location: "New York, United States",
    about:"",
    phone: " (555) 603-1724",
    image:
      "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/08/emily-brown-200x200.jpg",
  },
];

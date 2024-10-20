# TastyTrove Restaurant

TastyTrove is a dynamic marketplace for food lovers and sellers. It allows users to explore various menus, place orders, and leave reviews. Sellers are given the priviledges when authenticated to see foods, manage food items, see reviews, receive payment, see list of customers, and lastly see how their products(food items) has been purchased over a period of time. I built TastyTrove with NodeJs, Prisma, MongoDB, and Typescript.

![Project Screenshot](/Tasttrove_1.png)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [Hosting](#hosting)
- [Contact](#contact)

## Technologies Used

- **Backend:** Node.js, Express, Prisma, MongoDB, Socket.IO, Jest, Redis
- **Frontend:** React.js, Cypress, Framer-motion, Gsap, Tailwind.CSS.
- **Hosting:** Vercel

## Features

- **User Authentication:** Secure login and registration.
- **Role Management:** Admin, User, and Seller roles.
- **Menu Management:** Menus can be managed by the sellers.
- **Reservation System:** Status management for reservations.
- **Payment Integration:** Support for multiple payment statuses.
- **Review System:** Users can leave reviews and ratings.
- **Social System:** Users can chat with Sellers.
- **Notification System:** Sellers can receive notifications for every purchase .

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB database.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/edidiesky/tastytrove.git
   cd tastytrove
   ```
2. ```bash
   cd backend
   npm install
   ```

3. ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
WEB_ORIGIN= http://localhost:5173
```

Also Create a `.env` file in the `frontend` directory and add the following:

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
WEB_ORIGIN= http://localhost:5173
```

### Running the Project

Go to the root directory and install the package.json file. This will run both the frontend and backend concurrently

```bash

npm install
npm run dev
```

Open your browser and navigate to

```bash
http://localhost:5173
```

## Backend Overview

### Prisma Setup

Your Prisma schema is configured to use MongoDB as the database provider. Here’s the basic setup:

````prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}


### Controllers and Routes

Here's an example of how you might set up a route to get all menu items:

```javascript
import redis from "redis";
const redisclient = redis.createClient({
  url: "redis://127.0.0.1:6379",
}); //default port 6379

//Connect redis client to redis server
(async () => {
  await redisclient.connect();
})();

//Redis connection check
redisclient.on("ready", () => {
  console.log("Connected to Redis Server!");
});

redisclient.on("error", (err) => {
  console.log("Error Connecting to Redis Server: ", err);
});
// @description  Get all menu
// @route  GET /menu
// @access  Public
const GetAllMenu = asyncHandler(async (req, res) => {
  // setting the cache key for getting all the menus
  const cacheKey = "allMenus";
  // getting the data from redis based on the cache key
  const cachedMenus = await redisclient.get(cacheKey);
  if (cachedMenus) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(JSON.parse(cachedMenus));
  } else {
    const Menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    // setting the cached data to expire in an hour
    await redisclient.set(cacheKey, JSON.stringify(Menus), "EX", 3600);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(Menus);
  }
});
````

### Database Schema

The main models in the schema are `User`, `Menu`, `Review`, `Payment`,`Conversation`,`Message`, etc. Here's an example of the `User` model:

```prisma
model User {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  name            String
  username        String
  email           String?  @unique
  emailVerified   DateTime?
  image           String?
  country         String?
  city            String?
  role            RoleStatus @default(USER)
  hashedPassword  String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## Frontend Overview

### Components

The main components include `home`, `cart`, `singleMenu`, etc. Each component resides in the `src/components` directory.

### Testing with Cypress

I’ve written end-to-end tests using Cypress. To run the tests:

```bash
cd frontend
npx cypress open
```

## Hosting

The project is hosted on Vercel. You can access it [here](https://tastytrove.vercel.app/).

## Contact

For any questions or suggestions, feel free to reach out:

- Email: [essienedidiong1000@gmail.com](mailto:essienedidiong1000@gmail.com)
- LinkedIn: [My LinkedIn Profile](https://www.linkedin.com/in/victorezekielessien)

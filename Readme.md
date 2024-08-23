# TastyTrove Restaurant

TastyTrove is a dynamic marketplace for food lovers and sellers. It allows users to explore various menus, place orders, and leave reviews. Sellers are given the priviledges when authenticated to see foods, manage food items, see reviews, receive payment, see list of customers, and lastly see how their products(food items) has been purchased over a period of time

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [Hosting](#hosting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Technologies Used

- **Backend:** Node.js, Express, Prisma, MongoDB, Socket.IO, Jest
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
- **Social System:** Users can chat with Sellers.
- **Notification System:** Sellers can receive notifications for every purchase .

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB database.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```
2. ```bash
    cd backend
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

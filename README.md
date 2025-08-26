#  Tour Guide Pakistan

**Tour Guide Pakistan** is a **MERN stack application** designed to help users explore tourist places across Pakistan.  
Users can browse provinces, districts, and specific locations, and even make bookings.  
Admins can manage places, services, and view bookings through a dedicated dashboard.  

The project includes **user authentication, image uploads, responsive design, and animations**.

---

##  Features

-  **User Authentication** (JWT-based login & registration)
-  Explore **provinces and tourist places** with images and details
-  Book places with services (hotel, meal, jeep, car)
-  **Admin Dashboard**: add, update, delete places, and view bookings
-  Responsive design (mobile-friendly navbar with hamburger menu)
-  Animations using **Framer Motion**
-  About page crediting the developer
-  Footer with quick links & copyright

---

##  Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Router, Axios  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Multer, Bcrypt  
- **Database**: MongoDB  
- **Other Tools**: Nodemon, React Icons  

---

##  Prerequisites

Before running the project, install:

1. **VS Code** – [Download](https://code.visualstudio.com/)  
2. **Node.js (with npm)** – [Download](https://nodejs.org/)  
   ```bash
   node -v
   npm -v
  ``
## MongoDB (local database): Download (https://www.mongodb.com/try/download/community)
```bash
mongod   # start database
mongo    # open MongoDB shell
```
# Installation
## Clone Repository
 ```git
git clone https://github.com/salmankhani-sk/tour-guide
cd tour-guide
```
## Backend Setup (backend/)
```bash
cd backend
```

## Install dependencies:
```bash
npm install
npm init -y 
```

* Install Nodemon (if not already in package.json):
```bash
npm install nodemon --save-dev
```

# Create .env file:
```.env
MONGO_URI=mongodb://127.0.0.1:27017/tourguide
JWT_SECRET=superSecretKey123
PORT=5000
```

## Start the backend:
```bash
nodemon server.js

```
* Server runs at: http://localhost:5000

### Logs:

### MongoDB Connected

### Server running on port 5000

### Admin seeding:

### Default admin → naveed@gmail.com / 12345

# Frontend Setup (frontend3/)
```bash
cd ../frontend3


Install dependencies:

npm install


Install extra libraries (if needed):

npm install framer-motion react-icons


Start the frontend:

npm start
```

### Frontend runs at: http://localhost:3000

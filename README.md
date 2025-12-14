<img width="1858" height="1077" alt="image" src="https://github.com/user-attachments/assets/6aca4ae7-a897-4629-af79-c5bd6af05f3d" /># Sweet Shop Management System (AI Kata – TDD)

<img width="1919" height="1024" alt="Screenshot 2025-12-14 122242" src="https://github.com/user-attachments/assets/d6acdd3f-b291-4838-ab38-1da41e7e923b" />
## Project Explanatio
The Sweet Shop Management System is a full-stack web application designed to manage sweets, inventory, users, and orders.  
It allows users to register, log in, browse available sweets, search by category or price, and purchase items.  
Admin users can add, update, restock, and delete sweets, as well as manage inventory.

The project follows RESTful API principles, uses a real database, and is developed using Test-Driven Development (TDD) practices.

---

## Tech Stack
### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite Database
- JWT Authentication

### Frontend
- React.js
- Context API
- CSS

### Testing
- Jest
- Supertest (Backend API testing)

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Git

---

### Backend Setup
```bash
cd backend
npm install

cd sweet-shop-frontend
npm install
npm start
My AI Usage

I used ChatGPT to:

Brainstorm API endpoint structure

Generate initial backend boilerplate

Assist in writing unit test templates

Debug errors and improve code clarity

All AI-generated code was reviewed, modified, and tested by me before integration.


#outputs
<img width="1858" height="1077" alt="image" src="https://github.com/user-attachments/assets/0945f65b-b507-4ab9-aaf8-16aca2b8d06e" />
<img width="1858" height="1077" alt="Screenshot 2025-12-14 122252" src="https://github.com/user-attachments/assets/ae08fb9b-f4ba-4ff9-b296-ff2b1e5b94c9" />


# Sweet-Shop-Management-System
TDD/
└── TDD/
    ├── backend/
    │   ├── node_modules/
    │   ├── prisma/
    │   │   ├── migrations/
    │   │   ├── dev.db
    │   │   ├── schema.prisma
    │   │   └── seed.js
    │   │
    │   ├── src/
    │   │   ├── config/
    │   │   ├── controllers/
    │   │   ├── middleware/
    │   │   ├── middlewares/
    │   │   ├── routes/
    │   │   ├── services/
    │   │   ├── app.js
    │   │   ├── server.js
    │   │   └── utils.js
    │   │
    │   ├── uploads/
    │   │   ├── 1765684544709-8110....
    │   │   ├── 1765689014228-3654....
    │   │   ├── chocolate-fudge.png
    │   │   ├── chocolate-real.png
    │   │   └── chocolate.svg
    │   │
    │   ├── .env
    │   ├── .gitignore
    │   ├── check_orders.js
    │   ├── create_admin.js
    │   ├── verify_admin_orders.js
    │   ├── package.json
    │   └── package-lock.json
    │
    └── sweet-shop-frontend/
        ├── node_modules/
        ├── public/
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        │
        ├── src/
        │   ├── api/
        │   │   └── api.js
        │   │
        │   ├── components/
        │   │   ├── Auth/
        │   │   │   ├── Login.js
        │   │   │   └── Register.js
        │   │   │
        │   │   ├── Navbar/
        │   │   │   ├── Navbar.js
        │   │   │   └── Navbar.css
        │   │   │
        │   │   ├── Search/
        │   │   │   └── SearchBar.js
        │   │   │
        │   │   └── Sweets/
        │   │       ├── SweetCard.js
        │   │       ├── SweetForm.js
        │   │       ├── SweetList.js
        │   │       └── Sweets.css
        │   │
        │   ├── context/
        │   │   ├── AuthContext.js
        │   │   └── CartContext.js
        │   │
        │   ├── pages/
        │   │   ├── AdminPanel.js
        │   │   ├── Cart.js
        │   │   ├── Checkout.js
        │   │   ├── Dashboard.js
        │   │   ├── Home.js
        │   │   └── MyOrders.js
        │   │
        │   ├── utils/
        │   │   └── helpers.js
        │   │
        │   ├── App.js
        │   ├── App.css
        │   ├── App.test.js
        │   ├── index.js
        │   ├── index.css
        │   ├── logo.svg
        │   ├── reportWebVitals.js
        │   └── setupTests.js
        │
        ├── .env
        ├── .gitignore
        ├── package.json
        ├── package-lock.json
        └── README.md

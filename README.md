<p align="center">
  <img src="./client/public/logo.png" alt="Happy Paws Logo" width="100"/>
</p>

<h1 align="center">🐾 Happy Paws — Pet Adoption Platform</h1>

<p align="center">
  <strong>A full-stack MERN application that connects pet lovers with adoption shops,<br/>
  making the journey of finding a furry companion seamless and delightful.</strong>
</p>

<p align="center">
  🔄 <em>This is the MERN stack version of <a href="https://github.com/Manuacharya55/Pet_Adoption">Pet_Adoption</a> — rebuilt with React, Express, MongoDB & Node.js</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite"/>
</p>

<p align="center">
  <a href="https://pet-adoption-mern-rouge.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-brightgreen?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

## 🎯 Demo Access

> [!TIP]
> Click **"Fill Demo Data"** on the login page to automatically populate demo credentials and explore the app instantly — no sign-up needed!

| Role | Email | Password |
|------|-------|----------|
| User | `demo@gmail.com` | `demo123` |

---

## 📸 Screenshots

### 👤 User Interface

<details>
<summary><strong>🏠 Landing & Home</strong></summary>
<br/>

| Landing Page | Homepage — Categories |
|:---:|:---:|
| ![Landing Page](./Screenshots/Landing_Page.png) | ![Homepage Categories](./Screenshots/Homepage_Categories.png) |

</details>

<details>
<summary><strong>🔐 Authentication</strong></summary>
<br/>

| Login | Register |
|:---:|:---:|
| ![Login](./Screenshots/Login.png) | ![Register](./Screenshots/Register.png) |

</details>

<details>
<summary><strong>🐶 Browsing Pets & Shops</strong></summary>
<br/>

| Pets Page | Pet Description |
|:---:|:---:|
| ![Pets Page](./Screenshots/Pets_Page.png) | ![Pet Description](./Screenshots/Pet_Description.png) |

| Shops Page | Shop Description |
|:---:|:---:|
| ![Shops Page](./Screenshots/Shops_Page.png) | ![Shop Description](./Screenshots/Shop_Description.png) |

</details>

<details>
<summary><strong>❤️ Wishlist & Profile</strong></summary>
<br/>

| Wishlist | Profile Page |
|:---:|:---:|
| ![Wishlist](./Screenshots/Wishlist_Page.png) | ![Profile Page](./Screenshots/Profile_Page.png) |

| Update Profile | Address Page |
|:---:|:---:|
| ![Update Profile](./Screenshots/Update_Profile.png) | ![Address Page](./Screenshots/Address_Page.png) |

</details>

<details>
<summary><strong>🏪 Become a Shopkeeper</strong></summary>
<br/>

| Become Shopkeeper Form |
|:---:|
| ![Become Shopkeeper](./Screenshots/Become_Shopkeeper_Page.png) |

</details>

---

### 🏪 Shopkeeper Panel

<details>
<summary><strong>📊 Dashboard & Pet Management</strong></summary>
<br/>

| Shopkeeper Dashboard | Pet Listing |
|:---:|:---:|
| ![Shopkeeper Dashboard](./Screenshots/Shopkeeper_Dashboard.png) | ![Shopkeeper Pet Listing](./Screenshots/Shopkeeper_Pet_Listing.png) |

| Add Pet Form |
|:---:|
| ![Add Pet](./Screenshots/Shopkeeper_add_pet.png) |

</details>

<details>
<summary><strong>📋 Adoption Requests</strong></summary>
<br/>

| Adoption Requests | Request Details |
|:---:|:---:|
| ![Adoption Requests](./Screenshots/Shopkeeper_Adoption_Request.png) | ![Request Details](./Screenshots/Shopkeeper_Adoption_Request_Details.png) |

</details>

---

### 🛡️ Admin Panel

<details>
<summary><strong>📂 Categories & Management</strong></summary>
<br/>

| Category Listing | Add Category Modal |
|:---:|:---:|
| ![Category Listing](./Screenshots/Admin_Category_Listing.png) | ![Add Category Modal](./Screenshots/Admin_Add_Category_Modal.png) |

| All Shops | Pet Listing |
|:---:|:---:|
| ![All Shops](./Screenshots/Admin_All_Shops.png) | ![Pet Listing](./Screenshots/Admin_Pet_listing.png) |

</details>

---

## ✨ Features

<table>
<tr>
<td width="33%" valign="top">

### 👤 Users
- Browse & search pets by category, breed, and gender
- View detailed pet profiles with images
- Submit adoption requests to shops
- Manage wishlists of favorite pets
- Explore shops on an interactive map
- Apply to become a shopkeeper

</td>
<td width="33%" valign="top">

### 🏪 Shopkeepers
- Personal dashboard with shop analytics
- Add, edit, and manage pet listings
- Review & approve/reject adoption requests
- Track adoption history

</td>
<td width="33%" valign="top">

### 🛡️ Admins
- Centralized admin dashboard
- Manage users, pets, shops & categories
- Activate/deactivate listings
- Full platform oversight

</td>
</tr>
</table>

### 🔐 Authentication & Security
- JWT-based authentication with **role-based access control**
- Passwords hashed with **bcrypt**
- Protected routes for each role — `User` · `Shopkeeper` · `Admin`

### 📧 Notifications
- Email notifications via **Nodemailer** (SMTP)
- Bulk email support via **Brevo API**

---

## 🏗️ Tech Stack

| Layer        | Technology                                                       |
| ------------ | ---------------------------------------------------------------- |
| **Frontend** | React 19, React Router 7, Framer Motion, React Hook Form, Zod   |
| **Styling**  | Vanilla CSS (modern glassmorphic dark theme)                     |
| **Maps**     | Leaflet + React Leaflet                                          |
| **Bundler**  | Vite 7                                                           |
| **Backend**  | Node.js, Express 5                                               |
| **Database** | MongoDB Atlas, Mongoose 8                                        |
| **Auth**     | JSON Web Tokens, bcrypt                                          |
| **Email**    | Nodemailer, Brevo                                                |
| **HTTP**     | Axios, CORS                                                      |
| **UI Utils** | React Icons, React Hot Toast, Embla Carousel                     |

---

## 📁 Project Structure

```
Pet_Adoption_MERN/
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── Components/         # Reusable UI components
│       │   ├── ui/             # Buttons, modals, badges, inputs
│       │   ├── Table/          # Data tables
│       │   ├── Forms/          # Form components
│       │   └── Map/            # Leaflet map integration
│       ├── Pages/
│       │   ├── Admin/          # Dashboard, Categories, Users, Shops, Pets
│       │   ├── Auth/           # Login, Register
│       │   ├── Shop/           # Shop Dashboard, Pets, Requests, History
│       │   ├── Shared/         # Profile, Address (shared across roles)
│       │   └── User/           # Home, Pets, Shops, Wishlist, Descriptions
│       ├── Layouts/            # Role-specific layout wrappers
│       ├── Context/            # Auth context (React Context API)
│       ├── Schema/             # Zod validation schemas
│       ├── Utils/              # Axios instance, helpers
│       └── hooks/              # Custom React hooks
│
└── server/                     # Express backend
    └── src/
        ├── controllers/        # Route handlers
        ├── models/             # Mongoose schemas
        ├── router/             # Express route definitions
        ├── middleware/          # Auth middleware
        ├── utils/              # Error handling, mailers
        └── db/                 # MongoDB connection
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Manuacharya55/Pet_Adoption_MERN.git
cd Pet_Adoption_MERN
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SALT=8
NODEMAILER_USER=your_email@example.com
NODEMAILER_PASSWORD=your_email_password
HOST=smtp.your-email-provider.com
SMTP_PORT=587
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file inside `client/` with your API base URL:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Start the client:

```bash
npm run dev
```

### 4. Open in Browser

Visit **[http://localhost:5173](http://localhost:5173)** to view the application.

---

## 🔌 API Endpoints

| Module    | Base Route          | Description                         |
| --------- | ------------------- | ----------------------------------- |
| Auth      | `/api/v1/auth`      | Register, login, profile management |
| Address   | `/api/v1/address`   | CRUD operations for user addresses  |
| Shop      | `/api/v1/shop`      | Shop registration & management      |
| Category  | `/api/v1/category`  | Pet category management             |
| Pet       | `/api/v1/pet`       | Pet listings CRUD                   |
| Adoption  | `/api/v1/adoption`  | Adoption request workflow           |
| Admin     | `/api/v1/admin`     | Admin-only management endpoints     |
| Dashboard | `/api/v1/dashboard` | Dashboard analytics & stats         |
| Stats     | `/api/v1/stats`     | Platform-wide statistics            |

---

## 🧑‍💻 User Roles

| Role           | Access Level                                           |
| -------------- | ------------------------------------------------------ |
| **User**       | Browse pets, submit adoption requests, manage wishlist |
| **Shopkeeper** | Manage own shop, list pets, handle adoption requests   |
| **Admin**      | Full platform control — users, shops, pets, categories |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m "Add amazing feature"`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <strong>Manu</strong>
</p>

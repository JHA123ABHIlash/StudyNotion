# StudyNotion 🎓

A full-stack e-learning platform (inspired by Udemy) where **students** can browse, purchase, and learn from video courses, and **instructors** can create, manage, and sell their own courses.

🔗 **Live Demo:** https://study-notion-ashy-xi.vercel.app/
💻 **Repository:** https://github.com/JHA123ABHIlash/StudyNotion

---

## 📖 About the Project

StudyNotion is a MERN-stack online learning marketplace built from scratch — covering everything from authentication and payments to video-based learning and instructor analytics. It was built and deployed as a real, working product, including debugging and fixing several production-only issues (payment race conditions, CORS configuration, and email deliverability on cloud hosting) that don't show up in local development.

## ✨ Features

**For Students**
- Browse courses by category, view detailed course pages, and read reviews
- Add courses to cart and purchase securely via Razorpay
- Watch video lectures with progress tracking ("Mark as Completed")
- Leave ratings and reviews after enrolling
- Track enrolled courses and overall learning progress from a dashboard

**For Instructors**
- Create courses through a multi-step form (Course Info → Curriculum Builder → Publish)
- Add sections, sub-sections, and upload lecture videos (via Cloudinary)
- View an analytics dashboard with total students, income, and a visual chart
- Edit or manage previously created courses

**Platform-wide**
- Role-based access control (Student / Instructor / Admin)
- Secure authentication with JWT + OTP email verification
- Password reset and change-password flows
- Responsive, mobile-friendly UI

## 🛠️ Tech Stack

| Layer            | Technology                                         |
|-------------------|-----------------------------------------------------|
| Frontend          | React.js, Redux Toolkit, React Router, Tailwind CSS |
| Backend           | Node.js, Express.js                                 |
| Database          | MongoDB with Mongoose                               |
| Authentication    | JWT, bcrypt, OTP-based email verification           |
| Payments          | Razorpay (with server-side signature verification)  |
| Media Storage     | Cloudinary                                          |
| Transactional Email | Brevo (SMTP)                                      |
| Deployment        | Vercel (frontend), Render (backend)                 |

## 📁 Project Structure

```
StudyNotion/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable & feature-specific components
│   │   ├── pages/          # Route-level pages
│   │   ├── services/       # API operations & axios connector
│   │   ├── slices/         # Redux Toolkit slices
│   │   └── utils/          # Helper functions
│   └── package.json
└── backend/
    ├── controllers/        # Route handler logic
    ├── models/             # Mongoose schemas
    ├── routes/             # Express route definitions
    ├── middleware/         # Auth & role-based access middleware
    ├── mail/templates/     # HTML email templates
    ├── utils/              # Helper utilities (mail sender, duration calc, etc.)
    └── index.js
```

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or a MongoDB Atlas connection string)
- A Razorpay account (test mode keys)
- A Cloudinary account
- A Brevo (or other SMTP) account for sending emails

### 1. Clone the repository
```bash
git clone https://github.com/JHA123ABHIlash/StudyNotion.git
cd StudyNotion
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder_name

# Razorpay
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret

# Email (SMTP - e.g. Brevo)
MAIL_HOST=smtp-relay.brevo.com
MAIL_USER=your_smtp_login
MAIL_PASS=your_smtp_key

# Frontend origin (for CORS)
FRONTEND_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/` with:
```env
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

Run the frontend:
```bash
npm run dev
```

The app should now be running locally at `http://localhost:5173`.

## 🌐 Deployment Notes

- **Frontend (Vercel):** Requires a `vercel.json` with a SPA rewrite rule so client-side routes (e.g. `/dashboard/cart`) don't 404 on refresh:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
  Vite environment variables (`VITE_*`) are baked in at **build time** — updating them on Vercel requires a redeploy to take effect.
- **Backend (Render):** Free-tier outbound networking can be unreliable when connecting to Gmail's SMTP servers directly (IPv6 routing issues, connection timeouts). Using a dedicated transactional email provider like **Brevo** resolves this reliably.
- Payment verification is done **server-side** using Razorpay's HMAC signature check — never trust a "payment success" signal from the client alone.

## 🔑 Key API Routes (overview)

| Category      | Example Endpoints                                              |
|----------------|------------------------------------------------------------------|
| Auth           | `/api/v1/auth/signup`, `/login`, `/sendotp`, `/reset-password-token` |
| Course         | `/api/v1/course/createCourse`, `/getFullCourseDetails`, `/showAllCategories` |
| Payment        | `/api/v1/payment/capturePayment`, `/verifyPayment`              |
| Profile        | `/api/v1/profile/updateProfile`, `/getEnrolledCourses`, `/instructorDashboard` |

## 🙋 Author

**Abhilash Kumar Jha**
[GitHub](https://github.com/JHA123ABHIlash) · [LinkedIn](https://www.linkedin.com/in/abhilash-kumar-j/) · [LeetCode](https://leetcode.com/u/Abhilash_Jha121_1/)

---

*This project was built for learning purposes, replicating and extending a real-world e-learning platform's core functionality end-to-end — from database design to production deployment and debugging.*
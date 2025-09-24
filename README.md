# NoteApp – Multi-Tenant Note Management System

## Project Overview
NoteApp is a multi-tenant note-taking application that allows users to create, edit, and manage notes. It supports different subscription plans (Free and Pro) with a credit system for Free users and unlimited notes for Pro users. Admins can manage tenants, members, and subscription plans. The app is built with a modern full-stack tech stack and is fully responsive.  

---

## Live URLs
| Environment | URL | Description |
|-------------|-----|------------|
| Frontend    | `https://note-client-sigma.vercel.app` | React application with sidebar, notes page, members, subscription management |
| Backend     | `https://note-server-sigma.vercel.app`  | Express.js API server with authentication, note management, and tenant management endpoints |

---

## Tech Stack

**Frontend:**
- React 19 + React Router
- Tailwind CSS & Shadcn UI
- React Context & localStorage for session & tenant info
- Lucide icons
- Sonner for toast notifications

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT-based authentication
- dotenv for environment variables
- CORS enabled for cross-origin requests

**Deployment:**
- Backend: Vercel
- Frontend: Vercel

---

## Features

### Authentication & Authorization
- User signup/login with JWT
- Role-based access control (admin/user)
- Multi-tenant support
- Join tenant via invite code

### Tenant Management
- Admin can:
  - Upgrade tenant plans (Free → Pro)
  - Generate new invite codes
  - Remove users from a tenant
- Tenant info includes members and subscription plan

### Notes Management
- Users can:
  - Create, edit, delete notes
  - Search notes by title
  - View notes in cards with colored borders
- Free plan users have **3 credits**; Pro users have **unlimited notes**
- Note creation decrements credits automatically for Free users

### Subscription
- Display tenant plan (Free or Pro)
- Display remaining credits for Free plan
- Upgrade plan to Pro

### UI & UX
- Responsive design
- Sidebar with navigation (Notes, Subscription, Members)
- Protected routes (redirects unauthenticated users to login)
- Custom dialogs for note creation/editing
- Toast notifications for user feedback

---

## API Endpoints

### Authentication
- `POST /api/auth/register` – Create a new user
- `POST /api/auth/login` – Login user
- `POST /api/auth/join` – Join tenant via invite code

### Notes
- `GET /api/notes` – Fetch all notes for tenant
- `POST /api/notes` – Create note
- `PUT /api/notes/:id` – Update note
- `DELETE /api/notes/:id` – Delete note

### Tenant
- `GET /api/tenants/:slug` – Get tenant info with members
- `GET /api/tenants/:slug/plan` – Get tenant plan & credits
- `POST /api/tenants/:slug/upgrade` – Upgrade plan to Pro
- `POST /api/tenants/:slug/invite` – Generate new invite code
- `DELETE /api/tenants/:slug/users/:userId` – Remove user from tenant

---

## Environment Variables
### Server ENV
- PORT=8010
- MONGO_URI=<your_mongo_connection_string>
- JWT_SECRET=<your_jwt_secret>

### Client ENV
- VITE_API_BASE_URL=<your_api_base_url_after_deployment>
- VITE_BASE_URL=<your_base_url_after_deployment>

---

## How It Works
1. User signs up/login → JWT token stored in localStorage.
2. User can join a tenant using an invite code.
3. Free plan tenants have 3 credits; Pro tenants are unlimited.
4. Notes decrement credits automatically for Free tenants.
5. Admins can manage tenant users, plan upgrades, and generate invite codes.

---

## Future Enhancements
- Add real-time collaboration on notes
- Add file/image attachments to notes
- Implement subscription payments with Stripe
- Dark mode & theming support


# IIT Patna Event Portal

**Live Website:** https://iit-patna-event-portal-extenstion-t-nu.vercel.app/

A web portal for managing events at IIT Patna. Students can browse and register for events, clubs can create and manage events, and admins have full control over the system.

## Demo Credentials

### Quick Demo Access
Try all features using:
- **Email:** demo@gmail.com
- **Password:** trial@2025
- Select **Student**, **Club**, or **Admin** on login page

### Admin Access
For full admin capabilities:
- **Admin 1:** admin@iitp.ac.in / Admin@2025
- **Admin 2:** admin2@iitp.ac.in / Admin2@2025

## Features

### For Students
The student portal gives you everything you need to stay connected with campus events:

- **Event Discovery** - Browse through live events happening right now, check out what's coming up, and view past events you might have missed
- **Event Registration** - Register for events directly through the portal with just a few clicks
- **Personal Dashboard** - Access your profile showing your roll number, course details (B.Tech, M.Tech, etc.), branch, and year
- **Registration History** - Keep track of all the events you've signed up for in one place
- **Profile Management** - Update your information including photo, contact details, and academic info

### For Clubs & Committees
Club coordinators get powerful tools to manage events and engage with students:

- **Event Creation** - Create new events with all the details - title, description, date, venue, and registration deadlines
- **Event Management** - Edit event details, update status, and manage registrations
- **Registration Tracking** - See who's registered for your events and manage participant lists
- **Club Profile** - Maintain your committee profile with club name and committee code
- **Event Analytics** - Track how many students have registered and monitor event performance

### For Admins
Complete control over the entire system:

- **User Management** - View and manage all users - students, clubs, and other admins
- **Event Oversight** - Full access to all events across all clubs with ability to approve or moderate
- **System Administration** - Manage roles, permissions, and overall system settings
- **Data Access** - View comprehensive reports and analytics across the platform

## Pages

- **Home** - Landing page with event listings
- **Login/Register** - Separate login flows for students, clubs, and admins
- **Profile** - User profile management
- **Events** - Browse and filter events
- **Contact** - Contact form and support information

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Production)
- SQLite (Development)
- Framer Motion

## Project Structure

```
├── app/
│   ├── api/                # API routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── user/
│   │   └── logout/
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── events/
│   ├── profile/
│   └── contact/
├── components/
│   ├── Navbar.tsx
│   └── EventCard.tsx
├── lib/
│   ├── prisma.ts
│   └── auth.ts
├── prisma/
│   └── schema.prisma
└── public/
    └── images/
```

## Setup

```bash
npm install
npx prisma generate
npx prisma db push
node setup-demo.js
npm run dev
```

Open http://localhost:3000 and login with demo@gmail.com / trial@2025

---

Built with ❤️ for IIT Patna


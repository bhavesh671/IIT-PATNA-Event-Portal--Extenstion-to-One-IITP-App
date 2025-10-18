# IIT Patna Task Management System

A comprehensive task management and event portal for the Indian Institute of Technology Patna, built with Next.js, React, and modern web technologies.

## 🏛️ Features

### Landing Page
- **Hero Section**: Beautiful landing page with IIT Patna branding
- **Event Cards**: Display of live, upcoming, and completed events
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Show More/Less**: Collapsible sections for better content organization

### Authentication System
- **Student Login**: Roll number and password-based authentication
- **Club/Committee Login**: Committee ID-based access for event organizers
- **Admin Login**: Secure administrative access with enhanced security
- **Form Validation**: Client-side validation with user-friendly error messages

### Navigation
- **Modern Navbar**: Glass morphism effect with dropdown login options
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced UX

### Contact System
- **Contact Form**: Comprehensive contact form with user type selection
- **Contact Information**: Email, phone, address, and office hours
- **Social Media Links**: Integration with social platforms
- **Interactive Map**: Placeholder for campus location

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: React Icons
- **Authentication**: NextAuth.js (ready for integration)
- **Database**: MongoDB with Mongoose (ready for integration)
- **Deployment**: Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
task-management-system/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   │   ├── student/       # Student login
│   │   ├── club/          # Club/Committee login
│   │   └── admin/         # Admin login
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Navbar.tsx         # Navigation component
│   └── EventCard.tsx      # Event card component
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── README.md              # Project documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Student**: Blue theme (#3B82F6)
- **Committee**: Green theme (#10B981)
- **Admin**: Red theme (#DC2626)

### UI Components
- **Glass Morphism**: Modern glass effect on navigation
- **Gradient Backgrounds**: Beautiful gradient overlays
- **Card Design**: Clean, modern event cards
- **Form Design**: Consistent form styling across all pages
- **Animations**: Smooth page transitions and hover effects

## 🔐 Authentication Flow

### Student Login
1. Enter roll number and password
2. Form validation and submission
3. Redirect to student dashboard (to be implemented)

### Committee Login
1. Enter committee ID and password
2. Secure authentication
3. Access to event management tools (to be implemented)

### Admin Login
1. Admin ID and password required
2. Enhanced security measures
3. Full system administration access (to be implemented)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Mobile-first design with touch-friendly interfaces

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Content**: Update event data in `app/page.tsx`
- **Contact Info**: Edit contact details in `app/contact/page.tsx`

## 📋 TODO Features

### Phase 1 (Current)
- ✅ Landing page with event cards
- ✅ Authentication pages
- ✅ Contact page
- ✅ Responsive design
- ✅ Modern UI/UX

### Phase 2 (Next)
- 🔄 Database integration
- 🔄 User authentication
- 🔄 Event management system
- 🔄 Student dashboard
- 🔄 Committee dashboard
- 🔄 Admin dashboard

### Phase 3 (Future)
- 📋 Real-time notifications
- 📋 Event registration system
- 📋 File upload capabilities
- 📋 Email notifications
- 📋 Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: info@iitp.ac.in
- **Phone**: +91 612 302 8000
- **Address**: Bihta, Patna, Bihar 801106

## 🙏 Acknowledgments

- IIT Patna for the opportunity
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- React Icons for the beautiful icon library

---

**Built with ❤️ for IIT Patna** 
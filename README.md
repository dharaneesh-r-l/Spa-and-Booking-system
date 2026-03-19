# Global Salon & Spa Booking System

A full-featured spa and salon appointment booking web application with authentication, multi-step booking flow, and admin dashboard.

## Features

- 🔐 **User Authentication**: Register, login, and secure session management
- 🏙️ **City-Based Search**: Search and select from multiple cities
- 💇 **Salon Discovery**: Browse salons with ratings, locations, and services
- 📅 **Smart Booking**: Multi-step booking wizard with date/time selection
- 👤 **User Dashboard**: View and manage your appointments
- 👨‍💼 **Admin Panel**: Comprehensive dashboard for managing all bookings
- 📧 **Email Notifications**: Booking confirmation emails (configurable)
- 🎨 **Luxury UI**: Premium design with beige, gold, and black theme

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **State Management**: React Context API
- **Build Tool**: Vite
- **Data Storage**: localStorage (demo mode)

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm package manager

## Windows Setup Instructions

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/)

Verify installation in Command Prompt:
```cmd
node --version
npm --version
```

### 2. Install pnpm (Recommended)

```cmd
npm install -g pnpm
```

### 3. Clone/Extract Project

Navigate to the project directory:
```cmd
cd path\to\app-acdi0cpanz7l
```

### 4. Install Dependencies

```cmd
pnpm install
```

Or with npm:
```cmd
npm install
```

### 5. Run Development Server

```cmd
pnpm run dev
```

Or with npm:
```cmd
npm run dev
```

The application will start at `http://localhost:5173`

### 6. Build for Production

```cmd
pnpm run build
```

Or with npm:
```cmd
npm run build
```

## Default Admin Account

For testing purposes, a default admin account is created:

- **Email**: admin@spa.com
- **Password**: admin123

You can also create a new account - the first registered user will automatically become an admin.

## Application Structure

```
app-acdi0cpanz7l/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── booking/        # Multi-step booking wizard
│   │   ├── common/         # Shared components
│   │   ├── spa/            # Landing page components
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React Context (Auth)
│   ├── data/               # Sample data
│   ├── pages/              # Page components
│   ├── services/           # Business logic & data services
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run linter

## User Guide

### For Customers

1. **Register/Login**: Create an account or sign in
2. **Select City**: Search for your city
3. **Choose Salon**: Browse salons in your city
4. **Pick Service**: Select from available services
5. **Book Slot**: Choose date and time
6. **Confirm**: Review and confirm booking
7. **Manage**: View your bookings in "My Bookings"

### For Admins

1. **Login**: Use admin credentials at `/admin-login`
2. **Dashboard**: View all bookings across all cities
3. **Filter**: Search and filter by city, user, salon, or service
4. **Manage**: Delete bookings as needed

## Email Configuration

The application includes email notification functionality. To enable real email sending:

### Option 1: EmailJS (Recommended for Frontend)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the email service configuration (see Email Integration section below)

### Option 2: Backend Integration

For production use, integrate with a backend service:
- Node.js + Nodemailer
- Python Flask + SMTP
- SendGrid API
- AWS SES
- Mailgun

## Sample Data

The application includes sample data for:
- 8 cities (Chennai, Coimbatore, Bangalore, Mumbai, Delhi, Hyderabad, Pune, Kolkata)
- 20 salons across all cities
- 78 services with pricing and durations

## Security Notes

⚠️ **Important**: This is a demo application using localStorage for data persistence and client-side password hashing. For production use:

1. Implement proper backend authentication (JWT, OAuth)
2. Use server-side password hashing (bcrypt, argon2)
3. Store data in a real database (PostgreSQL, MongoDB)
4. Implement HTTPS
5. Add rate limiting and CSRF protection
6. Use environment variables for sensitive data

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:
```cmd
# Kill the process using the port (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found Errors

Clear cache and reinstall:
```cmd
rmdir /s /q node_modules
del package-lock.json
pnpm install
```

### Build Errors

Clear build cache:
```cmd
rmdir /s /q dist
pnpm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions, please check the documentation or create an issue in the project repository.

# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-acdi0cpanz7l

# Global Salon & Spa Booking System

A full-featured spa and salon appointment booking web application with authentication, multi-step booking flow, and admin dashboard.

## 🚀 Quick Start

### Easiest Way (Windows):
1. **Double-click `setup.bat`** (first time only)
2. **Double-click `start.bat`** (every time you want to run)
3. **Open browser** to http://localhost:5173

### Manual Way:
```cmd
npm install
npm run dev
```

📖 **For detailed instructions, see [RUNNING_GUIDE.md](RUNNING_GUIDE.md)**

---

## 📋 Batch Files Included

| File | Purpose | When to Use |
|------|---------|-------------|
| `setup.bat` | Install dependencies | First time setup |
| `start.bat` | Start dev server | Every time you run the app |
| `build.bat` | Build for production | When deploying |

---

## Features

- 🔐 **User Authentication**: Register, login, and secure session management
- 🏙️ **City-Based Search**: Search and select from multiple cities
- 💇 **Salon Discovery**: Browse salons with ratings, locations, and services
- 📅 **Smart Booking**: Multi-step booking wizard with date/time selection
- 👤 **User Dashboard**: View and manage your appointments
- 👨‍💼 **Admin Panel**: Comprehensive dashboard for managing all bookings
- 📧 **Email Notifications**: Booking confirmation emails (configurable)
- 🎨 **Luxury UI**: Premium design with beige, gold, and black theme

---

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **State Management**: React Context API
- **Build Tool**: Vite
- **Data Storage**: localStorage (demo mode)

---

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm package manager

---

## Windows Setup Instructions

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/)

Verify installation in Command Prompt:
```cmd
node --version
npm --version
```

### 2. Run Setup Script

Double-click `setup.bat` or run:
```cmd
setup.bat
```

This will:
- Check Node.js installation
- Install all dependencies
- Show next steps

### 3. Start the Application

Double-click `start.bat` or run:
```cmd
start.bat
```

The application will start at `http://localhost:5173`

### 4. Build for Production (Optional)

Double-click `build.bat` or run:
```cmd
build.bat
```

---

## Default Admin Account

For testing purposes, a default admin account is created:

- **Email**: admin@spa.com
- **Password**: admin123

You can also create a new account - the first registered user will automatically become an admin.

---

## Application Structure

```
app-acdi0cpanz7l/
├── setup.bat              # Setup script (run first)
├── start.bat              # Start script (run to start app)
├── build.bat              # Build script (for production)
├── README.md              # This file
├── RUNNING_GUIDE.md       # Detailed running instructions
├── QUICKSTART.md          # Quick reference guide
├── EMAIL_INTEGRATION.md   # Email setup guide
├── src/
│   ├── components/
│   │   ├── admin/         # Admin dashboard components
│   │   ├── booking/       # Multi-step booking wizard
│   │   ├── common/        # Shared components
│   │   ├── spa/           # Landing page components
│   │   └── ui/            # shadcn/ui components
│   ├── contexts/          # React Context (Auth)
│   ├── data/              # Sample data
│   ├── pages/             # Page components
│   ├── services/          # Business logic & data services
│   ├── types/             # TypeScript type definitions
│   └── App.tsx            # Main application component
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linter |

Or use the batch files:
- `start.bat` - Start development server
- `build.bat` - Build for production

---

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

---

## Email Configuration

The application includes email notification functionality. To enable real email sending:

### Option 1: EmailJS (Recommended for Frontend)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the email service configuration

**See [EMAIL_INTEGRATION.md](EMAIL_INTEGRATION.md) for detailed instructions**

### Option 2: Backend Integration

For production use, integrate with a backend service:
- Node.js + Nodemailer
- Python Flask + SMTP
- SendGrid API
- AWS SES
- Mailgun

**See [EMAIL_INTEGRATION.md](EMAIL_INTEGRATION.md) for all options**

---

## Sample Data

The application includes sample data for:
- 8 cities (Chennai, Coimbatore, Bangalore, Mumbai, Delhi, Hyderabad, Pune, Kolkata)
- 20 salons across all cities
- 78 services with pricing and durations

---

## Security Notes

⚠️ **Important**: This is a demo application using localStorage for data persistence and client-side password hashing. For production use:

1. Implement proper backend authentication (JWT, OAuth)
2. Use server-side password hashing (bcrypt, argon2)
3. Store data in a real database (PostgreSQL, MongoDB)
4. Implement HTTPS
5. Add rate limiting and CSRF protection
6. Use environment variables for sensitive data

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, `start.bat` will ask if you want to kill the process.

Or manually:
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found Errors

Clear cache and reinstall:
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

Or run `setup.bat` again.

### Build Errors

Clear build cache:
```cmd
rmdir /s /q dist
npm run build
```

Or run `build.bat`.

**For more troubleshooting, see [RUNNING_GUIDE.md](RUNNING_GUIDE.md)**

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Main documentation (this file) |
| `RUNNING_GUIDE.md` | Detailed running instructions and troubleshooting |
| `QUICKSTART.md` | Quick reference for common tasks |
| `EMAIL_INTEGRATION.md` | Email service integration guide |
| `TODO.md` | Development progress and notes |

---

## License

This project is for educational and demonstration purposes.

---

## Support

For issues or questions:
1. Check [RUNNING_GUIDE.md](RUNNING_GUIDE.md) for detailed instructions
2. Check [QUICKSTART.md](QUICKSTART.md) for quick reference
3. Review error messages in browser console (F12)
4. Check the troubleshooting section above

---

**Happy Booking! 🎉**

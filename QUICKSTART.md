# Quick Start Guide - Windows

## 🚀 Get Started in 5 Minutes

### Step 1: Install Node.js
1. Download from https://nodejs.org/ (LTS version recommended)
2. Run the installer
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

### Step 2: Navigate to Project
```cmd
cd C:\path\to\app-acdi0cpanz7l
```

### Step 3: Install Dependencies
```cmd
npm install
```
Or with pnpm (faster):
```cmd
npm install -g pnpm
pnpm install
```

### Step 4: Start Development Server
```cmd
npm run dev
```

### Step 5: Open in Browser
Open http://localhost:5173

---

## 🎯 Quick Test

### Test User Flow:
1. Click "Register" → Create account
2. Login automatically
3. Click "Book Appointment"
4. Select: City → Salon → Service → Date/Time
5. Confirm booking
6. Check "My Bookings" to see your appointment

### Test Admin Flow:
1. Go to http://localhost:5173/admin-login
2. Login with:
   - Email: `admin@spa.com`
   - Password: `admin123`
3. View all bookings in admin dashboard
4. Filter by city or search by name

---

## 📧 Email Testing

After booking, check your browser console (F12) to see the email that would be sent:
```
=== EMAIL NOTIFICATION ===
To: user@example.com
Subject: Booking Confirmation - Spa & Salon
HTML Content: [full email HTML]
========================
```

To enable real email sending, see `EMAIL_INTEGRATION.md`

---

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

## ❓ Troubleshooting

### Port 5173 already in use?
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Module errors?
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Can't see changes?
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache
- Restart dev server

---

## 📚 Documentation

- Full setup: `README.md`
- Email integration: `EMAIL_INTEGRATION.md`
- Project progress: `TODO.md`

---

## 🎨 Features

✅ User registration & login
✅ Multi-step booking wizard
✅ City-based salon search
✅ User dashboard (My Bookings)
✅ Admin dashboard (All Bookings)
✅ Email notifications (demo mode)
✅ Responsive design
✅ Luxury UI theme

---

## 🔐 Default Accounts

**Admin Account:**
- Email: admin@spa.com
- Password: admin123

**Or create your own:**
- First registered user = Admin
- Additional users = Regular users

---

## 💡 Tips

1. **Keep dev server running** while developing
2. **Check console** for errors and email logs
3. **Use Chrome DevTools** for debugging
4. **Test on different screen sizes** (responsive design)
5. **Clear localStorage** if you need to reset data:
   ```javascript
   // In browser console:
   localStorage.clear()
   location.reload()
   ```

---

## 🎉 You're Ready!

Start booking appointments and managing your spa business!

Need help? Check the full documentation in `README.md`

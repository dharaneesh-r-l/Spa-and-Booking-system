# Running the Application - Complete Guide

## 🚀 Quick Start (Easiest Method)

### For First-Time Setup:

1. **Double-click `setup.bat`**
   - This will check Node.js installation
   - Install all dependencies automatically
   - Takes 2-5 minutes

2. **Double-click `start.bat`**
   - This will start the development server
   - Automatically opens in your browser
   - Application runs at http://localhost:5173

That's it! The application is now running.

---

## 📋 Batch Files Included

### `setup.bat` - First Time Setup
**What it does:**
- ✅ Checks if Node.js is installed
- ✅ Lets you choose npm or pnpm
- ✅ Installs all dependencies
- ✅ Shows next steps

**When to use:**
- First time running the application
- After updating dependencies
- If you deleted node_modules folder

**How to run:**
```cmd
Double-click setup.bat
```
Or from command prompt:
```cmd
setup.bat
```

---

### `start.bat` - Start Development Server
**What it does:**
- ✅ Checks Node.js installation
- ✅ Checks if dependencies are installed
- ✅ Checks if port 5173 is available
- ✅ Starts the development server
- ✅ Shows admin credentials

**When to use:**
- Every time you want to run the application
- After making code changes (auto-reloads)

**How to run:**
```cmd
Double-click start.bat
```
Or from command prompt:
```cmd
start.bat
```

**To stop the server:**
- Press `Ctrl + C` in the command window
- Or close the command window

---

### `build.bat` - Build for Production
**What it does:**
- ✅ Checks Node.js and dependencies
- ✅ Builds optimized production files
- ✅ Creates 'dist' folder with deployable files

**When to use:**
- When ready to deploy to production
- To test production build
- Before uploading to web server

**How to run:**
```cmd
Double-click build.bat
```
Or from command prompt:
```cmd
build.bat
```

---

## 🎯 Step-by-Step Guide

### Complete Setup Process:

#### Step 1: Install Node.js (One-time)
1. Go to https://nodejs.org/
2. Download LTS version (recommended)
3. Run installer with default settings
4. Restart your computer (recommended)

#### Step 2: Extract Project
1. Extract the project ZIP file
2. Note the folder location (e.g., `C:\Projects\spa-booking`)

#### Step 3: Run Setup
1. Navigate to project folder
2. Double-click `setup.bat`
3. Choose package manager (npm or pnpm)
4. Wait for installation to complete
5. Press any key when done

#### Step 4: Start Application
1. Double-click `start.bat`
2. Wait for "ready in X ms" message
3. Browser opens automatically at http://localhost:5173
4. If browser doesn't open, manually go to http://localhost:5173

#### Step 5: Test the Application
1. Click "Register" to create an account
2. Or login with admin credentials:
   - Email: `admin@spa.com`
   - Password: `admin123`
3. Book an appointment
4. Check "My Bookings" to see your appointment

---

## 💻 Manual Commands (Alternative)

If you prefer using command prompt directly:

### Setup:
```cmd
cd C:\path\to\app-acdi0cpanz7l
npm install
```

### Start Development Server:
```cmd
npm run dev
```

### Build for Production:
```cmd
npm run build
```

### Preview Production Build:
```cmd
npm run preview
```

### Run Linter:
```cmd
npm run lint
```

---

## 🔧 Troubleshooting

### Problem: "Node.js is not installed"
**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your computer
3. Run `setup.bat` again

### Problem: "Port 5173 is already in use"
**Solution 1 (Automatic):**
- `start.bat` will ask if you want to kill the process
- Type `Y` and press Enter

**Solution 2 (Manual):**
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Problem: "Failed to install dependencies"
**Solution:**
1. Check internet connection
2. Run Command Prompt as Administrator
3. Delete `node_modules` folder
4. Run `setup.bat` again

### Problem: "Module not found" errors
**Solution:**
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Problem: Browser doesn't open automatically
**Solution:**
- Manually open browser
- Go to http://localhost:5173

### Problem: Changes not showing
**Solution:**
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Restart dev server (Ctrl+C, then run `start.bat` again)

### Problem: Build fails
**Solution:**
```cmd
npm run lint
```
Fix any errors shown, then try building again

---

## 📁 Project Structure

```
app-acdi0cpanz7l/
├── setup.bat              ← Run this first
├── start.bat              ← Run this to start app
├── build.bat              ← Run this to build for production
├── README.md              ← Full documentation
├── QUICKSTART.md          ← Quick reference
├── EMAIL_INTEGRATION.md   ← Email setup guide
├── RUNNING_GUIDE.md       ← This file
├── package.json           ← Dependencies list
├── src/                   ← Source code
├── public/                ← Static files
└── node_modules/          ← Installed packages (created by setup)
```

---

## 🌐 Accessing the Application

### Local Development:
- **URL**: http://localhost:5173
- **Network Access**: http://YOUR_IP:5173 (from other devices on same network)

### Production:
After running `build.bat`, deploy the `dist` folder to:
- Web hosting service (Netlify, Vercel, etc.)
- Your own web server
- Cloud platform (AWS, Azure, etc.)

---

## 👥 User Accounts

### Default Admin Account:
- **Email**: admin@spa.com
- **Password**: admin123
- **Access**: Admin dashboard at http://localhost:5173/admin

### Creating New Accounts:
1. Click "Register" on homepage
2. Fill in name, email, password
3. First registered user = Admin
4. Additional users = Regular users

### User Capabilities:
- **Regular Users**: Book appointments, view own bookings
- **Admin Users**: View all bookings, manage appointments, access admin dashboard

---

## 📧 Email Notifications

### Current Status:
- Email service is in **demo mode**
- Emails are logged to browser console (F12 → Console)
- Shows what email would be sent

### To Enable Real Emails:
See `EMAIL_INTEGRATION.md` for:
- EmailJS setup (easiest)
- SendGrid setup (professional)
- Nodemailer setup (backend)
- Flask SMTP setup (Python)

---

## 🎨 Features Available

✅ User registration and login
✅ Multi-step booking wizard
✅ City-based salon search (8 cities)
✅ 20 salons with ratings and locations
✅ 78 services with pricing
✅ Date and time selection
✅ User dashboard (My Bookings)
✅ Admin dashboard (All Bookings)
✅ Email notifications (demo mode)
✅ Responsive design (mobile + desktop)
✅ Luxury UI theme (beige, gold, black)

---

## 🔐 Security Notes

### For Development:
- Data stored in browser localStorage
- Passwords hashed with SHA-256
- Session management included

### For Production:
- Use proper backend authentication
- Implement server-side password hashing
- Use real database (PostgreSQL, MongoDB)
- Enable HTTPS
- Add rate limiting
- Use environment variables for secrets

---

## 📞 Support

### Documentation:
- **Full Guide**: README.md
- **Quick Start**: QUICKSTART.md
- **Email Setup**: EMAIL_INTEGRATION.md
- **This Guide**: RUNNING_GUIDE.md

### Common Issues:
- Check troubleshooting section above
- Review error messages in console
- Verify Node.js version (v16+)
- Ensure port 5173 is available

---

## 🎉 Success Checklist

Before considering setup complete, verify:

- [ ] Node.js installed and working
- [ ] Dependencies installed (node_modules folder exists)
- [ ] `start.bat` runs without errors
- [ ] Browser opens to http://localhost:5173
- [ ] Can register a new account
- [ ] Can login successfully
- [ ] Can book an appointment
- [ ] Can view bookings in "My Bookings"
- [ ] Admin can access dashboard at /admin
- [ ] Email logs appear in browser console

---

## 💡 Pro Tips

1. **Keep the command window open** while using the app
2. **Don't close the command window** or the server stops
3. **Use Ctrl+C** to stop the server gracefully
4. **Check console (F12)** for errors and email logs
5. **Clear localStorage** to reset all data:
   ```javascript
   // In browser console:
   localStorage.clear()
   location.reload()
   ```
6. **Use Chrome DevTools** for debugging
7. **Test responsive design** by resizing browser window

---

## 🚀 Next Steps

After successful setup:

1. **Explore the application**
   - Register an account
   - Book appointments
   - Check My Bookings
   - Test admin dashboard

2. **Customize the application**
   - Add more cities in `src/data/sampleData.ts`
   - Modify colors in `src/index.css`
   - Update services and pricing

3. **Set up email notifications**
   - Follow `EMAIL_INTEGRATION.md`
   - Choose an email service
   - Configure credentials

4. **Prepare for production**
   - Run `build.bat`
   - Test production build
   - Deploy to hosting service

---

## 📚 Additional Resources

- **Node.js Documentation**: https://nodejs.org/docs/
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/

---

**Happy Booking! 🎊**

If you encounter any issues not covered here, check the other documentation files or review the error messages carefully.

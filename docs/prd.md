# Global Salon & Spa Booking Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Global Salon & Spa Booking System

### 1.2 Application Description
A full-stack web application for global salon and spa appointment booking with premium luxury UI design, featuring city-based salon discovery, real-time booking management, email notifications, user authentication system, role-based access control, and admin dashboard.

## 2. Core Features

### 2.1 Authentication System

#### 2.1.1 User Registration
- Registration page route: /register
- Registration form fields:
  - Name (text input)
  - Email (email input, unique)
  - Password (password input)
- Password hashing using werkzeug.security
- Validation:
  - Check if email already exists
  - Display error message for duplicate email
- Store user data in database after successful registration

#### 2.1.2 User Login
- Login page route: /login
- Login form fields:
  - Email (email input)
  - Password (password input)
- Credential validation
- Session management using Flask sessions
- Keep user logged in across pages
- Error messages:
  - Invalid login credentials
  - Account not found

#### 2.1.3 Admin Authentication
- Admin login page route: /admin-login
- Admin credentials:
  - Email: admin@spa.com
  - Password: admin123 (hashed)
- Separate admin login interface
- Admin session management

#### 2.1.4 Logout Functionality
- Logout route: /logout
- Clear user session
- Redirect to login page

#### 2.1.5 Role-Based Access Control
- Normal users can:
  - Book appointments
  - View their own bookings
- Admin can:
  - Access /admin dashboard
  - View all bookings
  - Manage bookings (optional: delete/update)

#### 2.1.6 Protected Routes
- Booking functionality requires user login
- /admin route accessible only to admin
- Redirect unauthorized users to login page
- Prevent direct URL access without authentication

#### 2.1.7 My Bookings Page (Bonus)
- Route: /my-bookings
- Display logged-in user appointments
- Show booking details for current user only

### 2.2 Frontend Features

#### 2.2.1 City Selection
- City search bar at top of page
- Support for ANY city (not limited dropdown)
- Sample cities data: Chennai, Coimbatore, Bangalore, Mumbai, Delhi
- Search functionality for cities

#### 2.2.2 Salon Discovery
- Display salons based on selected city
- Salon cards showing:
  - Salon name
  - Address/location
  - Rating
  - Services offered
- Show No salons available in this city message when no results found

#### 2.2.3 Dynamic Services
- Load services dynamically when user selects a salon
- Each salon has different services
- Services update based on salon selection

#### 2.2.4 Booking Flow
- Complete user flow: City → Salon → Service → Date → Time → Book
- Booking form dynamically updates based on selections
- Input fields:
  - City (search/select)
  - Salon (selection based on city)
  - Service (dropdown based on salon)
  - Date (date picker)
  - Time (time picker)
- Automatically use logged-in user email and name
- Do not ask for email or name in booking form
- Submit button labeled Book Appointment
- Success message display after successful booking
- Loading indicators during data loading and booking process

#### 2.2.5 UI/UX Design
- Color theme: black, gold, beige
- Premium luxury style design
- Fully responsive design for mobile and desktop devices
- Modern and elegant interface
- Clean login and register pages
- Smooth transitions
- Use fetch API (AJAX) for:
  - Loading salons dynamically
  - Loading services dynamically
- No page reloads during interactions
- Display error messages:
  - Invalid login
  - Email already exists
  - Booking errors

### 2.3 Backend Features

#### 2.3.1 API Endpoints
- GET /cities (with optional search support)
- GET /salons?city=
- GET /services?salon_id=
- POST /register
- POST /login
- POST /admin-login
- POST /book
- GET /logout
- GET /my-bookings

#### 2.3.2 Business Logic
- Prevent double booking for same salon + date + time
- Validate all inputs properly
- Handle invalid city or salon gracefully
- Return appropriate error messages
- Password hashing using generate_password_hash
- Password verification using check_password_hash
- Session-based authentication
- Role verification for protected routes

#### 2.3.3 Email Notification
- Send confirmation email via SMTP (Gmail) after successful booking
- Email integration triggered only after booking completion
- Email content includes:
  - User name
  - City
  - Salon name
  - Service
  - Date and time
  - Friendly confirmation message

### 2.4 Admin Features
- Admin route: /admin
- Admin login required to access
- Display all bookings in table format
- Show booking details:
  - City
  - Salon
  - Service
  - Date
  - Time
  - Name
  - Email
- Optional: Delete or update bookings

### 2.5 Database Structure

#### Table: users
- id (primary key)
- name
- email (unique)
- password (hashed)

#### Table: cities
- id (primary key)
- name

#### Table: salons
- id (primary key)
- name
- city_id (foreign key)
- location
- rating

#### Table: services
- id (primary key)
- salon_id (foreign key)
- service_name
- price

#### Table: appointments
- id (primary key)
- user_id (foreign key)
- salon_id (foreign key)
- service_id (foreign key)
- date
- time
- created_at

## 3. Technical Implementation

### 3.1 Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- Database: SQLite
- Email Service: SMTP (Gmail)
- Security: werkzeug.security for password hashing
- Session Management: Flask sessions

### 3.2 Project Structure
- /frontend directory (HTML, CSS, JS files)
- /backend directory (Flask application)

### 3.3 Frontend-Backend Communication
- Use fetch API (AJAX) for:
  - City search
  - Loading salons dynamically
  - Loading services dynamically
  - Form submission
  - Authentication requests
- No page reload during interactions

### 3.4 Code Requirements
- Add beginner-friendly comments for code understanding
- Clean file structure
- Clear separation between frontend and backend code
- Secure password handling
- Proper session management
- Windows CMD friendly execution
- Code must run on local machine without deployment requirements

### 3.5 Security Requirements
- Use password hashing (generate_password_hash, check_password_hash)
- Prevent direct URL access without login
- Validate user sessions on protected routes
- Secure admin access
- Input validation and sanitization

## 4. Setup and Deployment

### 4.1 Installation Steps
- Install Flask: pip install flask
- Configure SMTP email settings
- Initialize database with users table
- Create admin account with hashed password
- Server startup instructions for Windows CMD
- Run application using: python app.py
- Application must be executable via Windows Command Prompt

### 4.2 Quick Run Guide
- Provide a comprehensive README.md file with step-by-step setup instructions including:
  - Prerequisites (Python version, required packages)
  - Installation commands
  - Database initialization steps
  - SMTP configuration guide
  - How to run the application
  - Default admin credentials
  - Troubleshooting common issues

### 4.3 Quick Run Batch File
- Create a run.bat file for Windows users
- Batch file should:
  - Check if Python is installed
  - Install required dependencies automatically (pip install -r requirements.txt)
  - Initialize database if not exists
  - Start the Flask application
  - Open default browser to application URL
- Provide error handling and user-friendly messages in batch file
- Include comments in batch file for clarity

### 4.4 Deliverables
- Complete working code for all files
- Authentication system fully integrated
- Error-free application execution
- Setup documentation (README.md)
- Windows CMD compatible startup script
- Quick run batch file (run.bat)
- requirements.txt file listing all dependencies

## 5. Other Requirements
- Application must run without errors on Windows local machine
- All features must be fully functional
- Code should be well-organized and documented
- Authentication system must be secure
- Application should behave like a mini version of a global salon booking platform where users can register, login, book any salon from any city, and view their bookings
- Email integration must trigger only after booking is completed
- Application must be Windows CMD friendly for local execution
- Provide clear documentation for easy setup and execution
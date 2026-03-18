# Global Salon & Spa Booking Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Global Salon & Spa Booking System

### 1.2 Application Description
A full-stack web application for global salon and spa appointment booking with premium luxury UI design, featuring city-based salon discovery, real-time booking management, email notifications, and admin dashboard.

## 2. Core Features

### 2.1 Frontend Features

#### 2.1.1 City Selection
- City search bar at top of page
- Support for ANY city (not limited dropdown)
- Sample cities data: Chennai, Coimbatore, Bangalore, Mumbai, Delhi
- Search functionality for cities

#### 2.1.2 Salon Discovery
- Display salons based on selected city
- Salon cards showing:
  - Salon name
  - Address/location
  - Rating
  - Services offered
- Show No salons available in this city message when no results found

#### 2.1.3 Dynamic Services
- Load services dynamically when user selects a salon
- Each salon has different services
- Services update based on salon selection

#### 2.1.4 Booking Flow
- Complete user flow: City → Salon → Service → Date → Time → Name → Email → Book
- Booking form dynamically updates based on selections
- Input fields:
  - Name (text input)
  - Email (email input)
  - City (search/select)
  - Salon (selection based on city)
  - Service (dropdown based on salon)
  - Date (date picker)
  - Time (time picker)
- Submit button labeled Book Appointment
- Success message display after successful booking
- Loading indicators during data loading and booking process

#### 2.1.5 UI/UX Design
- Color theme: black, gold, beige
- Premium luxury style design
- Fully responsive design for mobile and desktop devices
- Modern and elegant interface
- Smooth transitions
- Use fetch API (AJAX) for:
  - Loading salons dynamically
  - Loading services dynamically
- No page reloads during interactions

### 2.2 Backend Features

#### 2.2.1 API Endpoints
- GET /cities (with optional search support)
- GET /salons?city=
- GET /services?salon_id=
- POST /book

#### 2.2.2 Business Logic
- Prevent double booking for same salon + date + time
- Validate all inputs properly
- Handle invalid city or salon gracefully
- Return appropriate error messages

#### 2.2.3 Email Notification
- Send confirmation email via SMTP (Gmail) after successful booking
- Email content includes:
  - User name
  - City
  - Salon name
  - Service
  - Date and time
  - Friendly confirmation message

### 2.3 Admin Features
- Admin route: /admin
- Display all bookings in table format
- Show booking details:
  - City
  - Salon
  - Service
  - Date
  - Time
  - Name
  - Email

### 2.4 Database Structure

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
- name
- email
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

### 3.2 Project Structure
- /frontend directory (HTML, CSS, JS files)
- /backend directory (Flask application)

### 3.3 Frontend-Backend Communication
- Use fetch API (AJAX) for:
  - City search
  - Loading salons dynamically
  - Loading services dynamically
  - Form submission
- No page reload during interactions

### 3.4 Code Requirements
- Add beginner-friendly comments for code understanding
- Clean file structure
- Clear separation between frontend and backend code

## 4. Setup and Deployment

### 4.1 Installation Steps
- Install Flask: pip install flask
- Configure SMTP email settings
- Server startup instructions

### 4.2 Deliverables
- Complete working code for all files
- Error-free application execution
- Setup documentation

## 5. Other Requirements
- Application must run without errors
- All features must be fully functional
- Code should be well-organized and documented
- Application should behave like a mini version of a global salon booking platform where users can book any salon from any city
# Email Integration Guide

This guide explains how to integrate real email sending functionality into the Spa & Salon Booking System.

## Current Implementation

The application currently includes:
- ✅ Email service with HTML and plain text templates
- ✅ Booking confirmation email generation
- ✅ Email content logging to browser console (demo mode)
- ✅ Professional email templates with booking details

## Email Content

Each booking confirmation email includes:
- User name and email
- City and salon information
- Service details with pricing
- Appointment date and time
- Important reminders
- Link to view bookings

## Integration Options

### Option 1: EmailJS (Easiest - No Backend Required)

**Best for**: Frontend-only applications, quick setup, free tier available

#### Setup Steps:

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for a free account
   - Verify your email

2. **Add Email Service**
   - Go to Email Services
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection steps

3. **Create Email Template**
   - Go to Email Templates
   - Click "Create New Template"
   - Use these template variables:
     ```
     {{to_email}}
     {{to_name}}
     {{city}}
     {{salon}}
     {{service}}
     {{date}}
     {{time}}
     {{price}}
     {{html_content}}
     ```

4. **Get Your Credentials**
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates
   - Public Key: Found in Account > API Keys

5. **Install EmailJS**
   ```cmd
   pnpm add @emailjs/browser
   ```

6. **Update emailService.ts**
   
   Replace the mock implementation with:
   ```typescript
   import emailjs from '@emailjs/browser';

   // Initialize EmailJS (add to your main App.tsx or index.tsx)
   emailjs.init('YOUR_PUBLIC_KEY');

   export const sendBookingConfirmationEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
     try {
       const htmlContent = generateEmailHTML(data);
       const textContent = generateEmailText(data);

       const response = await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         {
           to_email: data.userEmail,
           to_name: data.userName,
           city: data.cityName,
           salon: data.salonName,
           service: data.serviceName,
           date: formatDateForEmail(data.date),
           time: data.time,
           price: data.servicePrice,
           html_content: htmlContent
         }
       );

       if (response.status === 200) {
         return {
           success: true,
           message: 'Confirmation email sent successfully!'
         };
       }

       return {
         success: false,
         message: 'Failed to send email'
       };
     } catch (error) {
       console.error('Email error:', error);
       return {
         success: false,
         message: 'Failed to send confirmation email'
       };
     }
   };
   ```

---

### Option 2: SendGrid API (Professional)

**Best for**: Production applications, high volume, detailed analytics

#### Setup Steps:

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com/)
   - Sign up (free tier: 100 emails/day)

2. **Get API Key**
   - Go to Settings > API Keys
   - Create API Key with "Mail Send" permission
   - Copy and save the key securely

3. **Verify Sender Email**
   - Go to Settings > Sender Authentication
   - Verify your sender email address

4. **Update emailService.ts**
   ```typescript
   export const sendBookingConfirmationEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
     try {
       const htmlContent = generateEmailHTML(data);
       const textContent = generateEmailText(data);

       const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer YOUR_SENDGRID_API_KEY`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           personalizations: [{
             to: [{ email: data.userEmail, name: data.userName }]
           }],
           from: { 
             email: 'noreply@yourdomain.com', 
             name: 'Spa & Salon' 
           },
           subject: 'Booking Confirmation - Spa & Salon',
           content: [
             { type: 'text/plain', value: textContent },
             { type: 'text/html', value: htmlContent }
           ]
         })
       });

       if (response.ok) {
         return {
           success: true,
           message: 'Confirmation email sent successfully!'
         };
       }

       return {
         success: false,
         message: 'Failed to send email'
       };
     } catch (error) {
       console.error('Email error:', error);
       return {
         success: false,
         message: 'Failed to send confirmation email'
       };
     }
   };
   ```

---

### Option 3: Backend Integration (Most Secure)

**Best for**: Production applications with existing backend

#### Node.js + Nodemailer

1. **Create Backend API**
   ```javascript
   // server.js
   const express = require('express');
   const nodemailer = require('nodemailer');
   const cors = require('cors');

   const app = express();
   app.use(cors());
   app.use(express.json());

   // Configure email transporter
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password' // Use App Password, not regular password
     }
   });

   // Email endpoint
   app.post('/api/send-email', async (req, res) => {
     try {
       const { to, subject, html, text } = req.body;

       await transporter.sendMail({
         from: '"Spa & Salon" <your-email@gmail.com>',
         to,
         subject,
         text,
         html
       });

       res.json({ success: true, message: 'Email sent successfully' });
     } catch (error) {
       console.error('Email error:', error);
       res.status(500).json({ success: false, message: 'Failed to send email' });
     }
   });

   app.listen(3000, () => {
     console.log('Email server running on port 3000');
   });
   ```

2. **Update Frontend emailService.ts**
   ```typescript
   export const sendBookingConfirmationEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
     try {
       const htmlContent = generateEmailHTML(data);
       const textContent = generateEmailText(data);

       const response = await fetch('http://localhost:3000/api/send-email', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           to: data.userEmail,
           subject: 'Booking Confirmation - Spa & Salon',
           html: htmlContent,
           text: textContent
         })
       });

       const result = await response.json();
       return result;
     } catch (error) {
       console.error('Email error:', error);
       return {
         success: false,
         message: 'Failed to send confirmation email'
       };
     }
   };
   ```

---

### Option 4: Python Flask + SMTP (Original Requirement)

**Best for**: Python developers, custom SMTP configuration

#### Setup Steps:

1. **Create Flask Backend**
   ```python
   # app.py
   from flask import Flask, request, jsonify
   from flask_cors import CORS
   import smtplib
   from email.mime.text import MIMEText
   from email.mime.multipart import MIMEMultipart

   app = Flask(__name__)
   CORS(app)

   @app.route('/api/send-email', methods=['POST'])
   def send_email():
       try:
           data = request.json
           
           # Email configuration
           sender_email = "your-email@gmail.com"
           sender_password = "your-app-password"
           
           # Create message
           message = MIMEMultipart("alternative")
           message["Subject"] = data['subject']
           message["From"] = sender_email
           message["To"] = data['to']
           
           # Add HTML and text parts
           text_part = MIMEText(data['text'], "plain")
           html_part = MIMEText(data['html'], "html")
           message.attach(text_part)
           message.attach(html_part)
           
           # Send email
           with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
               server.login(sender_email, sender_password)
               server.sendmail(sender_email, data['to'], message.as_string())
           
           return jsonify({"success": True, "message": "Email sent successfully"})
       except Exception as e:
           print(f"Error: {e}")
           return jsonify({"success": False, "message": "Failed to send email"}), 500

   if __name__ == '__main__':
       app.run(port=5000, debug=True)
   ```

2. **Install Dependencies**
   ```cmd
   pip install flask flask-cors
   ```

3. **Run Flask Server**
   ```cmd
   python app.py
   ```

4. **Update Frontend** (same as Option 3, but use port 5000)

---

## Gmail App Password Setup

If using Gmail for sending emails:

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account > Security > 2-Step Verification
3. Scroll to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in your email configuration

---

## Environment Variables

**IMPORTANT**: Never commit API keys or passwords to version control!

### Create .env file:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SENDGRID_API_KEY=your_sendgrid_key
```

### Access in code:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
```

### Add to .gitignore:
```
.env
.env.local
```

---

## Testing Email Functionality

### 1. Check Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Look for "=== EMAIL NOTIFICATION ===" logs
- Verify email content is correct

### 2. Test with Real Email Service
- Use a test email address
- Check spam folder if email doesn't arrive
- Verify sender email is authenticated

### 3. Common Issues

**Emails going to spam:**
- Verify sender domain
- Add SPF/DKIM records
- Use authenticated email service

**Gmail blocking:**
- Use App Password, not regular password
- Enable "Less secure app access" (not recommended)
- Use OAuth2 authentication

**Rate limiting:**
- Check service limits (EmailJS: 200/month free)
- Implement retry logic
- Add delay between emails

---

## Production Recommendations

1. **Use Environment Variables** for all sensitive data
2. **Implement Rate Limiting** to prevent abuse
3. **Add Email Queue** for high volume (Bull, RabbitMQ)
4. **Monitor Email Delivery** with service dashboards
5. **Handle Failures Gracefully** with retry logic
6. **Log Email Events** for debugging
7. **Use Professional Email Service** (SendGrid, AWS SES)
8. **Implement Unsubscribe** functionality
9. **Add Email Preferences** for users
10. **Test Thoroughly** before production deployment

---

## Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| EmailJS | 200/month | $7/month (1000) | Small apps |
| SendGrid | 100/day | $15/month (40k) | Medium apps |
| AWS SES | 62k/month | $0.10/1000 | Large apps |
| Mailgun | 5k/month | $35/month (50k) | Developers |
| Gmail SMTP | Limited | N/A | Testing only |

---

## Support

For issues with email integration:
1. Check service documentation
2. Verify API credentials
3. Test with simple example first
4. Check service status pages
5. Review error logs

---

## Next Steps

1. Choose an email service based on your needs
2. Follow the setup steps for your chosen option
3. Update the emailService.ts file
4. Test with a real email address
5. Monitor email delivery in production

Good luck with your email integration! 📧

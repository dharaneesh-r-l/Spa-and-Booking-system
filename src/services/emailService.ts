// Email notification service
// This service handles sending booking confirmation emails
import emailjs from '@emailjs/browser';

interface EmailData {
  userName: string;
  userEmail: string;
  cityName: string;
  salonName: string;
  salonLocation: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
}

// Format date for email
const formatDateForEmail = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Generate email HTML content
const generateEmailHTML = (data: EmailData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #F5E6D3 0%, #D4AF37 100%);
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: #1A1A1A;
      margin: 0;
      font-size: 28px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 2px solid #F5E6D3;
      border-top: none;
    }
    .booking-details {
      background: #F5E6D3;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #D4AF37;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #1A1A1A;
    }
    .value {
      color: #333;
    }
    .price {
      color: #D4AF37;
      font-weight: bold;
      font-size: 18px;
    }
    .footer {
      background: #1A1A1A;
      color: #F5E6D3;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 10px 10px;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: #D4AF37;
      color: #1A1A1A;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✨ Booking Confirmed!</h1>
  </div>
  
  <div class="content">
    <p>Dear ${data.userName},</p>
    
    <p>Thank you for booking with us! Your appointment has been successfully confirmed.</p>
    
    <div class="booking-details">
      <h2 style="margin-top: 0; color: #1A1A1A;">Appointment Details</h2>
      
      <div class="detail-row">
        <span class="label">City:</span>
        <span class="value">${data.cityName}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Salon:</span>
        <span class="value">${data.salonName}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Location:</span>
        <span class="value">${data.salonLocation}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Service:</span>
        <span class="value">${data.serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Date:</span>
        <span class="value">${formatDateForEmail(data.date)}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Time:</span>
        <span class="value">${data.time}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Price:</span>
        <span class="price">₹${data.servicePrice}</span>
      </div>
    </div>
    
    <p><strong>Important Reminders:</strong></p>
    <ul>
      <li>Please arrive 10 minutes before your appointment time</li>
      <li>Bring a valid ID for verification</li>
      <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
    </ul>
    
    <center>
      <a href="http://localhost:5173/my-bookings" class="button">View My Bookings</a>
    </center>
    
    <p>We look forward to serving you!</p>
    
    <p>Best regards,<br>
    <strong>Spa & Salon Team</strong></p>
  </div>
  
  <div class="footer">
    <p>© 2026 Spa & Salon Booking System. All rights reserved.</p>
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</body>
</html>
  `;
};

// Generate plain text version
const generateEmailText = (data: EmailData): string => {
  return `
BOOKING CONFIRMATION

Dear ${data.userName},

Thank you for booking with us! Your appointment has been successfully confirmed.

APPOINTMENT DETAILS:
-------------------
City: ${data.cityName}
Salon: ${data.salonName}
Location: ${data.salonLocation}
Service: ${data.serviceName}
Date: ${formatDateForEmail(data.date)}
Time: ${data.time}
Price: ₹${data.servicePrice}

IMPORTANT REMINDERS:
- Please arrive 10 minutes before your appointment time
- Bring a valid ID for verification
- If you need to reschedule, please contact us at least 24 hours in advance

We look forward to serving you!

Best regards,
Spa & Salon Team

---
© 2026 Spa & Salon Booking System. All rights reserved.
This is an automated message. Please do not reply to this email.
  `;
};

// Send email notification (mock implementation)
export const sendBookingConfirmationEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Generate email content
    const htmlContent = generateEmailHTML(data);
    const textContent = generateEmailText(data);

    // Fetch your keys from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Send using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: data.userEmail,
        to_name: data.userName,
        subject: `Booking Confirmed: ${data.serviceName} at ${data.salonName}`,
        html_content: htmlContent, // This sends all your styles/design to the template
        city: data.cityName,
        salon: data.salonName,
        service: data.serviceName,
        date: formatDateForEmail(data.date),
        time: data.time,
        price: data.servicePrice
      },
      publicKey
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Confirmation email sent successfully!'
      };
    } else {
      throw new Error('EmailJS returned non-200 status');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email. Please check your EmailJS configuration.'
    };
  }
};

// Export email content generators for testing
export { generateEmailHTML, generateEmailText, formatDateForEmail };

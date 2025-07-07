
# Law Advocate Website Backend

A Node.js/Express backend API for handling contact form submissions and sending emails via Nodemailer.

## Features

- ✅ Contact form API endpoint (`POST /api/contact`)
- ✅ Email notifications to advocate
- ✅ Confirmation emails to clients
- ✅ Input validation and error handling
- ✅ CORS support for frontend integration
- ✅ Environment variable management

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Update the following variables in `.env`:

```env
EMAIL_USER=drfatush005@gmail.com
EMAIL_PASS=your-gmail-app-password
TO_EMAIL=drfatush005@gmail.com
```

### 3. Gmail App Password Setup
To use Gmail SMTP, you need to generate an App Password:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to Security > 2-Step Verification
4. Scroll down and click "App passwords"
5. Generate a new app password for "Mail"
6. Use the 16-character password in your `.env` file

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "message": "I need legal consultation."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Error Responses:**
- `400`: Missing required fields
- `500`: Server/email sending error

### GET /health
Health check endpoint to verify server status.

## Email Templates

The backend sends two emails:
1. **To Advocate**: Contains client details and message
2. **To Client**: Confirmation email with next steps

## Production Deployment

1. Update `FRONTEND_URL` in `.env` to your production domain
2. Ensure all environment variables are set on your hosting platform
3. Update CORS origins if needed
4. Deploy to your preferred hosting service (Heroku, DigitalOcean, etc.)

## Security Notes

- Never commit `.env` files to version control
- Use strong app passwords for email authentication
- Configure CORS properly for production
- Consider rate limiting for the contact endpoint in production

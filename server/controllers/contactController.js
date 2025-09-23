const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle contact form submission
const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email to advocate
    const advocateEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This email was sent from the Mwaura Muroki Associates website contact form.
          </p>
        </div>
      `
    };

    // Email confirmation to client
    const clientEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Mwaura Muroki Associates & Advocates',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Mwaura Muroki Associates & Advocates</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Legal Services</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Thank you for contacting us, ${name}!</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              We have received your message and appreciate you reaching out to us. Our team will review your inquiry and respond within <strong>24 hours</strong>.
            </p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <div style="margin-top: 15px;">
                <strong>Message:</strong>
                <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">Contact Information:</h3>
              <p style="margin: 5px 0; color: #065f46;"><strong>Phone:</strong> +254 704 780 934</p>
              <p style="margin: 5px 0; color: #065f46;"><strong>WhatsApp:</strong> +254 704 780 934</p>
              <p style="margin: 5px 0; color: #065f46;"><strong>Email:</strong> mwauramurokiadvocates@gmail.com</p>
              <p style="margin: 5px 0; color: #065f46;"><strong>Office:</strong> Equity Plaza Commercial Street, 4th Floor Wing B Rm 420, Thika</p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              For urgent matters, feel free to call us directly at <strong>+254 704 780 934</strong> or reach us on WhatsApp.
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              We look forward to assisting you with your legal needs.
            </p>
            
            <div style="margin-top: 30px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Best regards,<br>
                <strong>Francis Mwaura Muroki</strong><br>
                Principal Advocate<br>
                Mwaura Muroki Associates & Advocates
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 15px; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(advocateEmailOptions);
    await transporter.sendMail(clientEmailOptions);

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again or contact us directly.'
    });
  }
};

module.exports = {
  handleContactForm
};
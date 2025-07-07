
const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle contact form submission
const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (name, email, and message).'
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content for the advocate
    const advocateEmailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #eff6ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Note:</strong> You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `
    };

    // Send email to advocate
    await transporter.sendMail(advocateEmailOptions);

    // Send confirmation email to client
    const clientEmailOptions = {
      from: `"Law Advocate Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting us - Message Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Thank You for Your Message
          </h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting our law firm. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> Legal Consultation Request</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <p>In the meantime, if you have any urgent matters, please feel free to call us at <strong>0796985336</strong> or reach out via WhatsApp.</p>
          
          <p>Best regards,<br>Law Advocate Services Team</p>
        </div>
      `
    };

    await transporter.sendMail(clientEmailOptions);

    console.log(`Contact form submission from ${name} (${email}) processed successfully`);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Try again later.'
    });
  }
};

module.exports = {
  handleContactForm
};


import nodemailer from 'nodemailer';

// Create transporter with better configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};


const testTransporter = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email transporter is ready');
    return true;
  } catch (error) {
    console.error('❌ Email transporter error:', error);
    return false;
  }
};

const DEFAULT_MEETING_LINK = "https://meet.google.com/eeu-xnbf-yzb";

// Enhanced email templates
const emailTemplates = {
  '1st Round': {
    subject: (position) => `First Round Interview Invitation - ${position}`,
    html: (candidate, position, date, time, meetingLink) => {
      const finalMeetingLink = meetingLink || DEFAULT_MEETING_LINK;
      return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; }
        .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Interview Invitation</h1>
        </div>
        
        <p>Dear <strong>${candidate}</strong>,</p>
        
        <p>We are pleased to invite you for the <strong>First Round</strong> of interview for the position of <strong>${position}</strong>.</p>
        
        <div class="content">
            <h3>Interview Details:</h3>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Date:</strong> ${date || 'To be confirmed'}</p>
            <p><strong>Time:</strong> ${time || 'To be confirmed'}</p>
            <p><strong>Meeting Link:</strong> 
                <a href="${finalMeetingLink}" class="button">Join Meeting</a>
            </p>
            <p style="word-break: break-all;"><small>Or copy this link: ${finalMeetingLink}</small></p>
        </div>

        <h3>Preparation Guidelines:</h3>
        <ul>
            <li>Please join the meeting 5-10 minutes before the scheduled time</li>
            <li>Ensure you have a stable internet connection</li>
            <li>Keep your resume and relevant documents ready</li>
            <li>Choose a quiet and well-lit environment</li>
        </ul>

        <p>We look forward to speaking with you!</p>
        
        <div class="footer">
            <p>Best regards,<br>HR Team</p>
        </div>
    </div>
</body>
</html>`;
    }
  },
  '2nd Round': {
    subject: (position) => `Second Round Interview Invitation - ${position}`,
    html: (candidate, position, date, time, meetingLink) => {
      const finalMeetingLink = meetingLink || DEFAULT_MEETING_LINK;
      return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; }
        .button { background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Second Round Interview</h1>
        </div>
        
        <p>Dear <strong>${candidate}</strong>,</p>
        
        <p>Congratulations! You have been shortlisted for the <strong>Second Round</strong> of interview for the position of <strong>${position}</strong>.</p>
        
        <div class="content">
            <h3>Interview Details:</h3>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Date:</strong> ${date || 'To be confirmed'}</p>
            <p><strong>Time:</strong> ${time || 'To be confirmed'}</p>
            <p><strong>Meeting Link:</strong> 
                <a href="${finalMeetingLink}" class="button">Join Meeting</a>
            </p>
            <p style="word-break: break-all;"><small>Or copy this link: ${finalMeetingLink}</small></p>
        </div>

        <h3>Preparation Guidelines:</h3>
        <ul>
            <li>Please join the meeting 5-10 minutes before the scheduled time</li>
            <li>Be prepared for technical/professional discussions</li>
            <li>Review the job requirements and your relevant experience</li>
            <li>Prepare any questions you may have about the role</li>
        </ul>

        <p>We look forward to our next conversation!</p>
        
        <div class="footer">
            <p>Best regards,<br>HR Team</p>
        </div>
    </div>
</body>
</html>`;
    }
  }
};

export const sendInterviewEmail = async (email, candidate, position, date, time, meetingLink, round) => {
  try {
    console.log('📧 Starting email sending process...');
    console.log('Email details:', {
      to: email,
      candidate,
      position,
      date,
      time,
      meetingLink,
      round
    });
console.log(meetingLink, "njjjjjjjjjjjjjjj");

    // Test transporter first
    const isTransporterReady = await testTransporter();
    if (!isTransporterReady) {
      throw new Error('Email transporter is not ready');
    }

    const template = emailTemplates[round];
    if (!template) {
      throw new Error(`No email template found for round: ${round}`);
    }

    const transporter = createTransporter();
    
    const finalMeetingLink = meetingLink || DEFAULT_MEETING_LINK;
    
    const mailOptions = {
      from: {
        name: 'HR Team',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: template.subject(position),
      html: template.html(candidate, position, date, time, finalMeetingLink),
      // Add text version for email clients that don't support HTML
      text: `
Interview Invitation

Dear ${candidate},

Your ${round} interview has been scheduled for the position of ${position}.

Date: ${date || 'To be confirmed'}
Time: ${time || 'To be confirmed'}
Meeting Link: ${finalMeetingLink}

Best regards,
HR Team
      `
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    
    return result;
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    throw error;
  }
};

export { testTransporter };
import nodemailer from "nodemailer";

export const sendInterviewMail = async (req, res) => {
  try {
    const { email, candidate, position, date, time, meetingLink } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HR Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Interview Scheduled for ${position}`,
      html: `
        <h2>Hello ${candidate},</h2>
        <p>Your interview has been scheduled.</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Meeting Link:</b> <a href="${meetingLink}">${meetingLink}</a></p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({ message: "Email sending failed", error: err.message });
  }
};

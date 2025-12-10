// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, message) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html: message,
//   };

//   await transporter.sendMail(mailOptions);
// };
// api/send-email.js
// import * as brevo from "@getbrevo/brevo";
// import "dotenv/config";

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const apiInstance = new brevo.TransactionalEmailsApi();
//     apiInstance.setApiKey(
//       brevo.TransactionalEmailsApiApiKeys.apiKey,
//       process.env.BREVO_API_KEY
//     );
//     console.log("====================================");
//     console.log(process.env.BREVO_API_KEY, to, subject, html);
//     console.log("====================================");

//     const emailData = {
//       sender: { email: process.env.FROM_EMAIL, name: "HR CRM" },
//       to: [{ email: to }],
//       subject,
//       htmlContent: html,
//     };

//     await apiInstance.sendTransacEmail(emailData);

//     return { success: true };
//   } catch (err) {
//     console.error("Brevo Error:", err);
//     return { success: false, error: err.message };
//   }
// };

// import * as brevo from "@getbrevo/brevo";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

// export const sendEmail1 = async (to, subject, html) => {
//   try {
//     // Initialize API Instance
//     // const apiInstance = new brevo.TransactionalEmailsApi();
//     let emailAPI = new TransactionalEmailsApi();
//     emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;
//     // "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";
//     console.log(
//       process.env.BREVO_API_KEY,
//       process.env.FROM_EMAIL,
//       "process.env.BREVO_API_KEY"
//     );

//     let message = new SendSmtpEmail();
//     message.subject = "subject";
//     message.textContent = "Hello world!";
//     message.sender = { name: "John Doe", email: "hr@octopustechno.com" };
//     message.to = [{ email: "kishanvaghani40@gmail.com" }];

//     emailAPI
//       .sendTransacEmail(message)
//       .then((res) => {
//         console.log(JSON.stringify(res.body), "resss");
//       })
//       .catch((err) => {
//         console.error("Error sending email:", err);
//       });
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// Run function for testing
// sendEmail();
export const sendEmail = async (to, subject, html) => {
  try {
    let emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

    let message = new SendSmtpEmail();
    message.subject = subject;
    message.htmlContent = html;
    message.sender = { name: "HR Octopus", email: process.env.FROM_EMAIL };
    message.to = [{ email: to }];

    return emailAPI
      .sendTransacEmail(message)
      .then((res) => {
        console.log(res, "==============");
        if (res?.body?.messageId) {
          return "success";
        }
        return "failed";
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        return "failed";
      });
  } catch (error) {
    console.error("Error sending email:", error);
    return "failed";
  }
};

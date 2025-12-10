import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

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

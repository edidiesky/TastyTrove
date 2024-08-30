// import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const recipients = [
      {
        email,
      },
    ];
    mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email!",
      html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
      category: "Email Verfication",
    });
    // console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

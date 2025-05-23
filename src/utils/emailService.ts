// emailService.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp.your-provider.com"
  auth: {
    user: process.env.EMAIL_USER, // your email (e.g. example@gmail.com)
    pass: process.env.EMAIL_PASS, // your app password (not your email password)
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export const formatEmergencyEmail = (
  name: string,
  lat: number,
  lng: number
): string => {
  return `🚨 Emergency Alert 🚨

User: ${name}
Location: https://maps.google.com/?q=${lat},${lng}

Please respond as soon as possible.`;
};

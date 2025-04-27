import nodemailer from "nodemailer";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD, BASE_URL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendVerifyEmail = async (email, verificationToken) => {
  const verifyLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;

  const emailOptions = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  };

  await transport.sendMail(emailOptions);
};

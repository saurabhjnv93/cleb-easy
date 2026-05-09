import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendResetEmail = async (to, resetUrl) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset your CelebEasy password',
    html: `<p>Use the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  });
};

export const sendBookingConfirmation = async (to, details) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your CelebEasy booking confirmation',
    html: `<p>Thank you for booking with CelebEasy.</p><p>${details}</p>`
  });
};

import nodemailer from "nodemailer";

function buildHtmlForUser(data) {
  return `
    <h2>Hello ${data.fullname},</h2>
    <p>
      Your adoption request <strong>#${data.adoptionId}</strong>
      for <strong>${data.petName}</strong> (Category: ${data.category})
      has been <strong>${data.status}</strong>.
    </p>
    <p>Thank you for choosing our pet shop.</p>
  `;
}

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, 
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100
  });

  return transporter;
};

export const sendEmail = async (payload) => {
  const list = Array.isArray(payload) ? payload : [payload];
  const transporterInstance = getTransporter();
  const results = [];

  for (const data of list) {
    if (!data.email) {
      results.push({ ok: false, error: "Missing email", data });
      continue;
    }

    try {
      await transporterInstance.sendMail({
        from: `"${process.env.SENDER_NAME}" <${process.env.NODEMAILER_USER}>`,
        to: data.email,
        subject: "Status Update: Adoption Request",
        html: buildHtmlForUser(data)
      });

      results.push({ ok: true, email: data.email });
    } catch (err) {
      console.error(`Failed to send email to ${data.email}:`, err.message);
      results.push({ ok: false, email: data.email, error: err.message });
    }
  }

  return results;
};


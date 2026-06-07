const nodemailer = require('nodemailer');

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, type, phone, email, url, goals, services } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const servicesList = Array.isArray(services) && services.length
    ? `<ul>${services.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : 'None selected';

  try {
    await transporter.sendMail({
      from: `"GO AI Website" <${process.env.SMTP_USER}>`,
      to: 'support@go-ai.gr',
      replyTo: email,
      subject: `New Enquiry from ${name} – GO AI Website`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || 'Not provided'}</p>
        <p><strong>Business:</strong> ${esc(business) || 'Not provided'}</p>
        <p><strong>Business type:</strong> ${esc(type) || 'Not specified'}</p>
        <p><strong>Website:</strong> ${esc(url) || 'Not provided'}</p>
        <p><strong>Selected services:</strong></p>
        ${servicesList}
        <p><strong>Goals / Message:</strong></p>
        <p>${esc(goals) || '—'}</p>
        <hr/>
        <p style="color:#888;font-size:12px">Sent from go-ai.gr website contact form</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: err.message });
  }
};

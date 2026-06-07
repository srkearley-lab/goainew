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

  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS set:', !!process.env.SMTP_PASS);

  // Try multiple configurations in order — ip.gr supports 465 (SSL) and 587 (STARTTLS)
  const configs = [
    { host: process.env.SMTP_HOST || 'mail.go-ai.gr', port: 465, secure: true },
    { host: process.env.SMTP_HOST || 'mail.go-ai.gr', port: 587, secure: false },
    { host: 'mail.go-ai.gr', port: 465, secure: true },
    { host: 'smtp.go-ai.gr', port: 465, secure: true },
  ];

  const servicesList = Array.isArray(services) && services.length
    ? `<ul>${services.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : 'None selected';

  const mailOptions = {
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
  };

  let lastError = null;

  for (const config of configs) {
    try {
      console.log(`Trying SMTP: ${config.host}:${config.port} secure=${config.secure}`);
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
      });

      await transporter.sendMail(mailOptions);
      console.log(`Email sent via ${config.host}:${config.port}`);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(`Failed ${config.host}:${config.port} —`, err.message);
      lastError = err;
    }
  }

  return res.status(500).json({ error: lastError ? lastError.message : 'All SMTP configs failed' });
};

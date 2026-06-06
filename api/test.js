export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    ok: true,
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyStart: process.env.STRIPE_SECRET_KEY
      ? process.env.STRIPE_SECRET_KEY.substring(0, 10)
      : 'NOT SET',
  });
}

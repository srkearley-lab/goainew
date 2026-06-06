const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'GO AI — Starter Website Package',
              description: 'Professional website built in 7 days',
              images: ['https://goainew-weld.vercel.app/og-image.png'],
            },
            unit_amount: 45000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://goainew-weld.vercel.app/#/success',
      cancel_url: 'https://goainew-weld.vercel.app/#/contact',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Full Stripe error:', JSON.stringify(err));
    res.status(500).json({
      error: err.message,
      type: err.type,
      code: err.code,
    });
  }
};

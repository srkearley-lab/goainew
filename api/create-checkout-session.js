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
              name: 'GoAI Website Package',
            },
            unit_amount: 45000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://goainew.vercel.app/success',
      cancel_url: 'https://goainew.vercel.app',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

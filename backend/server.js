// backend/server.js

const express = require('express');
const app = express();
const cors = require('cors');

// ❗️ IMPORTANT: Replace with your Stripe secret key from your Stripe Dashboard
const stripe = require('stripe')('sk_test_51S2RGMJ8RKkMEZ712u787r6VLZMz1XL7ZfjarZSFaU1Yat2ZjToH7D9pcV5iO5h4rA6DtxV5F2QbGxa7nr5b9iCG00B5k1Gdsa'); 

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allows your frontend to connect
app.use(express.json()); // Allows the server to read JSON data

// API Endpoint to create the payment session
app.post('/create-checkout-session', async (req, res) => {
  const { email, productName, amount, metadata } = req.body;

  if (!email || !productName || !amount) {
    return res.status(400).json({ error: 'Missing required information' });
  }

  try {
    // Find or create a Stripe Customer to associate the payment with
    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email: email });
    }

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Your component uses '$', so assuming USD. Change to 'inr' if needed.
            product_data: { name: productName },
            unit_amount: Math.round(amount * 100), // Convert to cents/paisa
          },
          quantity: 1,
        },
      ],
      metadata: metadata, // Pass along extra order details
      mode: 'payment',
      success_url: 'http://localhost:5173/order-confirmed?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/', // --- ✅ CORRECTED --- Matches your frontend port
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: 'Failed to create payment session.' });
  }
});


// --- ✨ NEW ENDPOINT --- to GET order details after payment
app.get('/order-details', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required.' });
  }
  try {
    // Use the Stripe SDK to retrieve the session details
    // The `expand` option gets the full product details for the line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    // Send the relevant details back to the frontend
    res.json({
      customerName: session.metadata.customerName,
      customerEmail: session.customer_details.email,
      shippingAddress: session.metadata.shipping,
      orderNumber: session.id, // Use the session ID as the order number
      orderDate: new Date(session.created * 1000).toLocaleDateString(), // Convert timestamp to date
      total: (session.amount_total / 100).toFixed(2), // Convert from cents to dollars
      productName: session.line_items.data[0].price.product.name,
      productDescription: `${session.metadata.frameType} + ${session.metadata.subscription}`,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: 'Failed to retrieve order details.' });
  }
});


// Start the server
const PORT = 4242;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
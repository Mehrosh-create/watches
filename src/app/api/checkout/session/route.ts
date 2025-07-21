import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { items, shipping } = await request.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productId.name,
          },
          unit_amount: Math.round(item.productId.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Add more as needed
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping.shippingMethod === 'express' ? 999 : 0,
              currency: 'usd',
            },
            display_name: shipping.shippingMethod === 'express' 
              ? 'Express Shipping' 
              : 'Standard Shipping',
          },
        },
      ],
    })

    return NextResponse.json({ id: session.id })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
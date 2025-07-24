import { FiTruck, FiClock, FiBox, FiRefreshCw, FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-12 h-64">
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <FiTruck className="text-white text-4xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Shipping Information</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Fast, reliable delivery for your timepieces
          </p>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiTruck className="text-2xl text-black mr-3" />
            <h3 className="text-xl font-semibold">Standard Shipping</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>3-5 business days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Free on orders over $100</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>$5.99 for orders under $100</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiClock className="text-2xl text-black mr-3" />
            <h3 className="text-xl font-semibold">Express Shipping</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>1-2 business days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>$14.99 flat rate</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Order by 2PM for same-day dispatch</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiMapPin className="text-2xl text-black mr-3" />
            <h3 className="text-xl font-semibold">International</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>5-10 business days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Customs fees may apply</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Starting at $24.99</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tracking & Returns */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiBox className="text-2xl text-black mr-3" />
            <h2 className="text-2xl font-bold">Order Tracking</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Once your order ships, you'll receive a tracking number via email. Use our 
            <Link href="/track-order" className="text-black hover:underline ml-1">order tracker</Link> 
            to follow your package's journey.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Shipping carriers we use:</h4>
            <div className="flex flex-wrap gap-4">
              {['FedEx', 'UPS', 'USPS', 'DHL'].map(carrier => (
                <span key={carrier} className="px-3 py-1 bg-white rounded-full text-sm shadow-sm">
                  {carrier}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiRefreshCw className="text-2xl text-black mr-3" />
            <h2 className="text-2xl font-bold">Returns & Exchanges</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We offer 30-day returns on all unworn watches. Original tags must be attached and packaging included.
          </p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Free returns for US customers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>International return shipping paid by customer</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Refunds processed within 3-5 business days</span>
            </li>
          </ul>
          <Link 
            href="/returns" 
            className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
          >
            Start a Return
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-16">
        <h2 className="text-2xl font-bold mb-6">Shipping FAQs</h2>
        <div className="space-y-4">
          {[
            {
              question: "Do you ship internationally?",
              answer: "Yes, we ship to over 50 countries worldwide. International orders typically take 5-10 business days to arrive, depending on customs processing."
            },
            {
              question: "Can I change my shipping address after ordering?",
              answer: "Address changes must be made within 1 hour of placing your order. Contact our support team immediately if you need to update your shipping information."
            },
            {
              question: "What if my package is lost or damaged?",
              answer: "We insure all shipments. If your package is lost in transit or arrives damaged, contact us within 7 days of delivery for assistance."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Need Help With Shipping?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our customer service team is available 7 days a week to assist with any shipping questions.
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
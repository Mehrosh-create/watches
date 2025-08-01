import { FiPackage, FiRefreshCw, FiCheckCircle, FiDollarSign } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-12 h-160">
          <Image
                                                src="/exchange.jpg"
                                                alt="About WatchHub"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                priority
                                              />
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <FiRefreshCw className="text-white text-4xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Returns & Exchanges</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Easy and hassle-free returns within 30 days
          </p>
        </div>
      </div>

      {/* Return Process */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
              1
            </div>
            <h3 className="text-xl font-semibold">Initiate Return</h3>
          </div>
          <p className="text-gray-600">
            Start your return online through our 
            <Link href="/account/returns" className="text-black hover:underline ml-1">returns portal</Link>. 
            You'll need your order number and email address.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
              2
            </div>
            <h3 className="text-xl font-semibold">Package Items</h3>
          </div>
          <p className="text-gray-600">
            Include all original packaging, tags, and accessories. Use the prepaid return label we provide.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
              3
            </div>
            <h3 className="text-xl font-semibold">Ship & Receive Refund</h3>
          </div>
          <p className="text-gray-600">
            Drop off at any carrier location. Refunds are processed within 3-5 business days after we receive your return.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Return Policy */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiCheckCircle className="text-2xl text-black mr-3" />
            <h2 className="text-2xl font-bold">Return Policy</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>30-day return window from delivery date</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Items must be unworn, with original tags attached</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Original packaging must be included</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Free returns for US customers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>International customers pay return shipping</span>
            </li>
          </ul>
        </div>

        {/* Refund Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <FiDollarSign className="text-2xl text-black mr-3" />
            <h2 className="text-2xl font-bold">Refund Information</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Refunds issued to original payment method</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Processing takes 3-5 business days after we receive your return</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Shipping costs are non-refundable</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Sale items are final and cannot be returned</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Exchanges are free for defective or incorrect items</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Exchanges */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-16">
        <div className="flex items-center mb-4">
          <FiPackage className="text-2xl text-black mr-3" />
          <h2 className="text-2xl font-bold">Exchanges</h2>
        </div>
        <p className="text-gray-600 mb-4">
          We're happy to exchange your watch for a different size or model. Please note:
        </p>
        <ul className="space-y-3 text-gray-600 mb-4">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Exchanges are subject to availability</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>You'll receive a prepaid return label for the original item</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>New item will ship once we receive your return</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Price differences will be charged/refunded as needed</span>
          </li>
        </ul>
        <Link 
          href="/contact" 
          className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
        >
          Request an Exchange
        </Link>
      </div>

      {/* Non-Returnable Items */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-16">
        <h2 className="text-xl font-bold text-red-800 mb-3">Non-Returnable Items</h2>
        <ul className="space-y-2 text-red-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Watches with removed or damaged tags</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Items showing signs of wear or damage</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Personalized or engraved watches</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Clearance or sale items</span>
          </li>
        </ul>
      </div>

      {/* Support CTA */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Need Help With Your Return?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our customer service team is available to assist with any return questions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Contact Support
          </Link>
          <Link 
            href="/faq" 
            className="inline-block bg-white border border-black text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Visit FAQs
          </Link>
        </div>
      </div>
    </div>
  )
}
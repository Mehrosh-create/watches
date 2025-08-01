'use client'
import { useState, useEffect } from 'react';
import { FiHelpCircle, FiShoppingBag, FiTruck, FiCreditCard, FiShield, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import Cursor from '@/components/Cursor';

const faqCategories = [
  {
    title: "Ordering",
    icon: <FiShoppingBag className="text-2xl mr-3" />,
    questions: [
      {
        question: "How do I place an order?",
        answer: "Simply browse our collection, select your desired watch, add it to your cart, and proceed through our secure checkout process."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. Contact our support team immediately for assistance."
      },
      {
        question: "Do you offer gift wrapping?",
        answer: "Yes! Select the gift wrapping option at checkout for a premium presentation at just $4.99."
      }
    ]
  },
  {
    title: "Shipping",
    icon: <FiTruck className="text-2xl mr-3" />,
    questions: [
      {
        question: "What shipping options are available?",
        answer: "We offer standard (3-5 days), express (1-2 days), and international shipping. Rates vary based on location and speed."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries. International orders typically arrive within 5-10 business days."
      },
      {
        question: "How can I track my order?",
        answer: "You'll receive a tracking number via email once your order ships. Use our order tracker for real-time updates."
      }
    ]
  },
  {
    title: "Payments",
    icon: <FiCreditCard className="text-2xl mr-3" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use 256-bit SSL encryption and never store your full payment details."
      },
      {
        question: "Do you offer installment plans?",
        answer: "Yes, select watches are eligible for installment payments through PayPal Credit and Affirm."
      }
    ]
  },
  {
    title: "Returns & Warranty",
    icon: <FiShield className="text-2xl mr-3" />,
    questions: [
      {
        question: "What's your return policy?",
        answer: "Unworn watches with original packaging can be returned within 30 days for a full refund."
      },
      {
        question: "What warranty do you offer?",
        answer: "All watches come with a 2-year manufacturer warranty covering defects in materials and workmanship."
      },
      {
        question: "How do I initiate a return?",
        answer: "Start the process through our returns portal. You'll receive a prepaid return label for US orders."
      }
    ]
  },
  {
    title: "Product Care",
    icon: <FiClock className="text-2xl mr-3" />,
    questions: [
      {
        question: "How should I care for my watch?",
        answer: "Avoid extreme temperatures and moisture. Clean with a soft, dry cloth. Mechanical watches should be serviced every 3-5 years."
      },
      {
        question: "Can I swim with my watch?",
        answer: "Only if it's specifically rated as water resistant. Check the product specifications for water resistance levels."
      },
      {
        question: "How often should I replace the battery?",
        answer: "Quartz watch batteries typically last 2-3 years. We offer free battery replacement for the first year."
      }
    ]
  }
];

export default function FAQPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Custom Cursor */}
      <Cursor 
        mousePos={mousePos} 
        isDragging={isDragging} 
        showCursor={showCursor} 
      />

      {/* Hero Section */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-12 h-120">
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
        <Image
          src="/question.jpg"
          alt="About WatchHub"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <FiHelpCircle className="text-white text-4xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      {/* Search FAQ */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FiHelpCircle className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-12 mb-16">
        {faqCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center bg-gray-50 p-4 border-b">
              {category.icon}
              <h2 className="text-xl font-bold">{category.title}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {category.questions.map((item, qIndex) => (
                <details key={qIndex} className="group p-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="font-medium text-gray-900 group-hover:text-black">
                      {item.question}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-gray-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support CTA */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our customer support team is available 7 days a week to assist you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Contact Support
          </Link>
          <Link
            href="/live-chat"
            className="inline-block bg-white border border-black text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Live Chat Now
          </Link>
        </div>
      </div>
    </div>
  );
}
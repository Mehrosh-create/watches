// src/components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">WatchHub</h3>
            <p className="text-gray-600">Your premium destination for quality timepieces since 2025.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-600 hover:text-black">All Watches</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-black">Categories</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-600 hover:text-black">New Arrivals</Link></li>
              <li><Link href="/sale" className="text-gray-600 hover:text-black">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-black">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-black">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-black">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-black">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-2">Subscribe for updates and offers</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 border rounded-l focus:outline-none"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} WatchHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
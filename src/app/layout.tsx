import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WatchHub',
  description: 'Your premium watch destination',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
              <Link href="/" className="text-2xl font-bold text-gray-800">WatchHub</Link>
              
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex relative w-1/3 max-w-md">
                <input
                  type="text"
                  placeholder="Search watches..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              {/* User Actions */}
              <div className="flex items-center space-x-6">
                <Link href="/signin" className="hidden md:flex items-center text-gray-600 hover:text-gray-900">
                  <FiUser className="mr-1" /> Sign In
                </Link>
                <Link href="/register" className="hidden md:block text-gray-600 hover:text-gray-900">
                  Register
                </Link>
                <Link href="/cart" className="relative flex items-center text-gray-600 hover:text-gray-900">
                  <FiShoppingCart className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Mobile Search - Hidden on desktop */}
            <div className="md:hidden relative mb-4">
              <input
                type="text"
                placeholder="Search watches..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-6 overflow-x-auto py-2 md:py-0 md:justify-center">
              <Link href="/" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Home</Link>
              <Link href="/shop" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Shop</Link>
              <Link href="/categories" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Categories</Link>
              <Link href="/about" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">About</Link>
              <Link href="/contact" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="bg-gray-100 py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">WatchHub</h3>
                <p className="text-gray-600">Your premium destination for quality timepieces since 2015.</p>
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
      </body>
    </html>
  )
}
import React from 'react'
import { Search } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='px-4 md:px-12 py-4 bg-white text-black '>
        <div className='flex justify-between items-center'>
         <a href="/" className='hidden md:inline-block text-lg font-semibold'>Watches</a>  
         <div className="relative max-w-[300px] md:w-[400px]">
          <div className="absolute inset-y-0 start-0 flex items-center px-3 pointer-events-none">
         <Search className="w-4 h-4" />
          </div>
          <input type="text" className='h-[36px] relative pl-10 border-[1px] border-black/[0.7] text-sm rounded-[8px] w-full py-2 px-3 focus:outline-none bg-transparent' placeholder="Search..." />
          </div> 
         <a href="/add-product" className="add-product-link">
         <button className='bg-black text-white px-3 py-2 rounded-md cursor-pointer'>Add Product</button></a>

        </div>
    </nav>
  )
}

export default Navbar

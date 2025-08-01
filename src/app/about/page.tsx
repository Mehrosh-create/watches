import { FaAward, FaHeadset, FaShippingFast, FaShieldAlt } from 'react-icons/fa'
import Image from 'next/image'

const features = [
  {
    icon: <FaAward className="text-3xl text-black" />,
    title: "Premium Quality",
    description: "We source only the highest quality watches from trusted manufacturers."
  },
  {
    icon: <FaHeadset className="text-3xl text-black" />,
    title: "24/7 Support",
    description: "Our customer service team is always ready to assist you."
  },
  {
    icon: <FaShippingFast className="text-3xl text-black" />,
    title: "Fast Shipping",
    description: "We deliver worldwide with express shipping options."
  },
  {
    icon: <FaShieldAlt className="text-3xl text-black" />,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-standard security."
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-12 h-160 group">
        <Image
          src="/teaaam.jpg"
          alt="About WatchHub"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Passion</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Discover the passion behind WatchHub and our commitment to excellence
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2025, WatchHub has grown from a small boutique to one of the leading online watch retailers. 
              Our team of horology enthusiasts is dedicated to bringing you the finest timepieces from around the world.
            </p>
            <p className="text-gray-700 mb-4">
              We carefully curate our collection to ensure every watch meets our high standards of quality, craftsmanship, 
              and design. Whether you're looking for a luxury statement piece or a reliable everyday watch, we've got you covered.
            </p>
            <p className="text-gray-700">
              At WatchHub, we believe a watch is more than just a timekeeping device - it's an expression of personal style 
              and a companion for life's important moments.
            </p>
          </div>
          <div className="relative h-100 rounded-xl overflow-hidden bg-gray-200 group">
            <Image
              src="/teaam.jpg"
              alt="WatchHub Team"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-black-600 transition-colors duration-300">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "Founder & CEO", image: "/team.jpg" },
            { name: "Michael Chen", role: "Head of Purchasing", image: "/team1.jpg" },
            { name: "Emma Rodriguez", role: "Customer Experience", image: "/team2.jpg" }
          ].map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative h-100 bg-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold group-hover:text-black-600 transition-colors duration-300">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-12 h-64">
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            We'd love to hear from you! Reach out with any questions or feedback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-gray-700 mb-6">
              Have questions about our products or need assistance with your order? 
              Our team is here to help you with any inquiries you may have.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold">Our Location</h3>
                <p className="text-gray-600">123 Watch Street, Time Square, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <FaPhone className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri: 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <FaEnvelope className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold">Email Address</h3>
                <p className="text-gray-600">support@watchhub.com</p>
                <p className="text-gray-600">orders@watchhub.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <FaClock className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Social Media - Updated with Icons */}
          <div className="pt-4">
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF size={18} />, name: 'Facebook' },
                { icon: <FaTwitter size={18} />, name: 'Twitter' },
                { icon: <FaInstagram size={18} />, name: 'Instagram' },
                { icon: <FaPinterestP size={18} />, name: 'Pinterest' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition flex items-center justify-center w-12 h-12"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map - Embedded Google Maps */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-96 mb-8">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2152560170646!2d-73.98784492423912!3d40.75798597138988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1623861486932!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="WatchHub Location Map"
        ></iframe>
      </div>

      {/* Additional Contact Card */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Visit Our Showroom</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600">123 Watch Street<br />Time Square<br />New York, NY 10001</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Showroom Hours</h3>
            <p className="text-gray-600">Monday-Friday: 10am-8pm<br />Saturday: 10am-6pm<br />Sunday: 12pm-5pm</p>
          </div>
        </div>
      </div>
    </div>
  )
}
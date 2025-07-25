'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'

// Define ShippingInfo type (or import from your context/types if exported)
type ShippingInfo = {
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  postalCode: string
  phone: string
  shippingMethod: 'standard' | 'express'
}

export default function ShippingPage() {
  const { updateShipping } = useCart()
  // Strictly type the form data for shippingMethod
  const [formData, setFormData] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      updateShipping(formData)
      window.location.href = '/checkout/payment'
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'shippingMethod'
        ? (value as 'standard' | 'express')
        : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Shipping Information</h1>

        <CheckoutSteps activeStep={1} />

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div>
            <label className="block mb-1">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Country</option>
               <option value="PK">Pakistan</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              {/* Add more countries */}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          <div>
            <label className="block mb-1">Postal Code</label>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium mb-2">Shipping Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={formData.shippingMethod === 'standard'}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>Standard Shipping (5-7 business days) - Free</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={formData.shippingMethod === 'express'}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>Express Shipping (2-3 business days) - $9.99</span>
              </label>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

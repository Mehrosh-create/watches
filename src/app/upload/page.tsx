'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FiUpload, FiWatch, FiDollarSign, FiTag, FiInfo, FiImage, FiX } from 'react-icons/fi'

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    description: '',
    movementType: 'automatic',
    caseMaterial: 'stainless-steel'
  })
  const [uploadedImages, setUploadedImages] = useState<{url: string, publicId: string}[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    
    try {
      setIsLoading(true)
      setError('')
      
      const files = Array.from(e.target.files)
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error('Failed to upload image')
        }
        
        const { data } = await response.json()
        setUploadedImages(prev => [...prev, {
          url: data.secure_url,
          publicId: data.public_id
        }])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = async (publicId: string) => {
    try {
      // Optional: Add API call to delete from Cloudinary if needed
      setUploadedImages(prev => prev.filter(img => img.publicId !== publicId))
    } catch (err) {
      setError('Failed to remove image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (uploadedImages.length === 0) {
        throw new Error('At least one image is required')
      }

      const response = await fetch('/api/watches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages.map(img => img.url),
          price: parseFloat(formData.price)
        })
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      router.push('/dashboard?upload=success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload watch')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Upload New Watch</h2>
            <p className="text-gray-600 mt-1">Add your luxury timepiece to our collection</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiInfo className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="py-2 pl-10 block w-full border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="e.g. Rolex, Omega"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                  Model <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiWatch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="py-2 pl-10 block w-full border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="e.g. Submariner, Speedmaster"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="py-2 pl-10 block w-full border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="movementType" className="block text-sm font-medium text-gray-700">
                  Movement Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="movementType"
                  name="movementType"
                  value={formData.movementType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                  <option value="quartz">Quartz</option>
                  <option value="solar">Solar</option>
                </select>
              </div>

              <div>
                <label htmlFor="caseMaterial" className="block text-sm font-medium text-gray-700">
                  Case Material <span className="text-red-500">*</span>
                </label>
                <select
                  id="caseMaterial"
                  name="caseMaterial"
                  value={formData.caseMaterial}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="stainless-steel">Stainless Steel</option>
                  <option value="gold">Gold</option>
                  <option value="titanium">Titanium</option>
                  <option value="ceramic">Ceramic</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="Describe the watch features, condition, and specifications..."
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Images <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-800 focus-within:outline-none"
                      >
                        <span>Upload images</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          multiple
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div className="sm:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={image.publicId} className="relative group">
                        <img
                          src={image.url}
                          alt={`Watch preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.publicId)}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Uploading...' : 'Submit Watch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
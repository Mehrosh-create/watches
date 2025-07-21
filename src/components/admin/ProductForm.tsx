// components/admin/ProductForm.tsx
"use client"

import { ChangeEvent, FormEvent, useState } from "react"

interface ProductFormProps {
  onSubmit: (formData: FormData) => void
  isLoading?: boolean
  initialData?: {
    name: string
    price: number
    description: string
    stock: number
    image?: string
  }
}

export default function ProductForm({ 
  onSubmit, 
  isLoading = false,
  initialData
}: ProductFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null
  )

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          defaultValue={initialData?.name}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1">Price ($)</label>
        <input
          type="number"
          name="price"
          defaultValue={initialData?.price}
          min="0"
          step="0.01"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          defaultValue={initialData?.stock}
          min="0"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {previewImage && (
          <div className="mt-2">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="h-32 object-contain"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg text-white ${
          isLoading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isLoading ? 'Processing...' : 'Save Product'}
      </button>
    </form>
  )
}
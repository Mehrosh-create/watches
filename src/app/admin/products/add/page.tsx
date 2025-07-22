"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        router.push("/admin/products")
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to create product")
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <ProductForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
      />
    </div>
  )
}

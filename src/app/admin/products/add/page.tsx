// app/admin/products/add/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        router.push("/admin/products")
      } else {
        const error = await response.json()
        alert(`Error: ${error.message || "Failed to create product"}`)
      }
    } catch (error) {
      alert("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
      />
    </div>
  )
}
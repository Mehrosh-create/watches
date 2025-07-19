// components/admin/ProductForm.tsx
'use client';

import { createProduct } from '@/lib/actions/product';
import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const productReducer = async (
    prevState: { success?: boolean; error?: string } | null,
    formData: FormData
  ) => {
    return await createProduct(formData);
  };

  const [state, formAction] = useFormState(productReducer, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success('Product created successfully');
      formRef.current?.reset();
      router.push('/admin/products');
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      {/* Add other form fields (price, description, etc.) */}
      
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Product
      </button>
    </form>
  );
}
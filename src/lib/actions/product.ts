'use server';

import { connectToDB } from '@/lib/models/database';
import { Product } from '../models/product';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    category: formData.get('category'),
    images: JSON.parse(formData.get('images') as string),
  };

  try {
    await connectToDB();
    await Product.create(rawFormData);
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create product' };
  }
}
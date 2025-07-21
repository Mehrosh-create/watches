// lib/actions/cart.ts
'use server';

import { connectToDB } from '@/lib/models/database';
import { Cart } from '../models/Cart';
import { revalidatePath } from 'next/cache';
import { auth } from '@/app/api/auth/[...nextauth]/route';  

export async function addToCart(productId: string, quantity: number = 1) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'You must be logged in' };
  }

  try {
    await connectToDB();
    
    let cart = await Cart.findOne({ user: session.user.id });
    
    if (!cart) {
      cart = await Cart.create({ 
        user: session.user.id, 
        items: [{ product: productId, quantity }] 
      });
    } else {
      const existingItem = cart.items.find((item: { product: { toString: () => string; }; }) => 
        item.product.toString() === productId
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      
      await cart.save();
    }
    
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to add to cart' };
  }
}
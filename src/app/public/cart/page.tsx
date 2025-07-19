// app/cart/page.tsx
import { connectToDB } from '@/lib/models/database';
import { Cart } from '@/lib/models/Cart';
import { Product } from '@/lib/models/product';
import { auth } from '@/lib/auth';
import CartItems from '@/components/CartItems';

export default async function CartPage() {
  const session = await auth();
  
  if (!session?.user) {
    return <div>Please login to view your cart</div>;
  }

  await connectToDB();
  const cart = await Cart.findOne({ user: session.user.id })
    .populate('items.product');

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <CartItems cart={JSON.parse(JSON.stringify(cart))} />
    </div>
  );
}
// types/index.ts
import { AuthUser } from '@/lib/auth';
import mongoose from 'mongoose';



export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  numReviews?: number;
  reviews?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId | Product;
  user: mongoose.Types.ObjectId | User;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: mongoose.Types.ObjectId | Product;
  quantity: number;
  priceAtPurchase?: number; // Snapshot of price when added
}

export interface Cart {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId | User;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: mongoose.Types.ObjectId | Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  email: string;
}

export interface Order {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId | User;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId | User;
  products: Array<mongoose.Types.ObjectId | Product>;
  createdAt: Date;
  updatedAt: Date;
}

/* ================ API RESPONSE TYPES ================ */

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/* ================ COMPONENT PROP TYPES ================ */

export interface ProductListProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

export interface CartSummaryProps {
  cart: Cart;
  loading?: boolean;
}

export interface CheckoutStepsProps {
  currentStep: number;
}

/* ================ FORM TYPES ================ */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
}

export interface ShippingFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentFormData {
  paymentMethod: 'stripe' | 'paypal' | 'cod';
}

/* ================ UTILITY TYPES ================ */

export type WithUser<T = {}> = T & {
  user?: AuthUser;
};

export type SearchParams = Record<string, string | string[] | undefined>;

/* ================ ENUMS ================ */

export enum OrderStatus {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ProductCategory {
  WATCHES = 'watches',
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  ACCESSORIES = 'accessories',
}

/* ================ TYPE GUARDS ================ */

export function isProduct(obj: any): obj is Product {
  return obj && typeof obj.name === 'string' && typeof obj.price === 'number';
}

export function isUser(obj: any): obj is User {
  return obj && typeof obj.email === 'string' && typeof obj.role === 'string';
}
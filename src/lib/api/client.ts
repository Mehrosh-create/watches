// src/lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define your API response type
export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  success: boolean;
}

// Create configured Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ...response,
      success: true,
    };
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject({
      success: false,
      error: {
        message: error.response?.data?.message || error.message,
        code: error.code,
      },
    });
  }
);

// Generic request function
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient(config);
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      error: {
        message: error.error?.message || 'API request failed',
        code: error.error?.code,
      },
      success: false,
    };
  }
}

// Specific API methods for your e-commerce app
export const ecommerceApi = {
  // Product endpoints
  getProducts: () => apiRequest<{ products: Product[] }>({ method: 'GET', url: '/products' }),
  getProduct: (id: string) => apiRequest<Product>({ method: 'GET', url: `/products/${id}` }),

  // Cart endpoints
  getCart: () => apiRequest<Cart>({ method: 'GET', url: '/cart' }),
  addToCart: (productId: string, quantity: number) =>
    apiRequest<Cart>({ method: 'POST', url: '/cart', data: { productId, quantity } }),

  // Auth endpoints
  login: (email: string, password: string) =>
    apiRequest<{ token: string; user: User }>({ 
      method: 'POST', 
      url: '/auth/login', 
      data: { email, password } 
    }),
};

// Type definitions (put these in separate types file if preferred)
interface Product {
  id: string;
  name: string;
  price: number;
  // ... other product fields
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}
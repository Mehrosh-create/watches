// src/lib/api/client.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';

// ----- API Response Type -----
export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  success: boolean;
}

// ----- Axios Instance -----
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----- JWT Request Interceptor -----
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (token) {
      // Use .set method for Axios v1+ (AxiosHeaders)
      if (config.headers && typeof (config.headers as AxiosHeaders).set === 'function') {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
      } else if (config.headers) {
        // Fallback for legacy/edge cases
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----- Response/Error Interceptor -----
apiClient.interceptors.response.use(
  (response: AxiosResponse) => ({
    ...response,
    success: true,
  }),
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject({
      success: false,
      error: {
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          'Unknown error',
        code: error.code,
      },
    });
  }
);

// ----- API Request Wrapper -----
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient(config);
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    // Safely access error props
    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      typeof error.error === 'object'
    ) {
      return {
        error: {
          message: error.error?.message || 'API request failed',
          code: error.error?.code,
        },
        success: false,
      };
    } else if (error instanceof AxiosError) {
      return {
        error: {
          message:
            (error.response?.data as any)?.message ||
            error.message ||
            'API request failed',
          code: error.code,
        },
        success: false,
      };
    }
    return {
      error: { message: 'API request failed', code: undefined },
      success: false,
    };
  }
}

// ----- E-Commerce API Methods -----
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
      data: { email, password },
    }),
};

// ----- Types (can move to a separate types file) -----
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

// Базовый URL для API запросов
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:5000/api';

// Общая функция для API запросов
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка сервера');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Аутентификация
export const authAPI = {
  // Регистрация
  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  // Вход
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  // Получение профиля
  getProfile: async () => {
    return await apiRequest('/auth/profile');
  },

  // Обновление профиля
  updateProfile: async (userData) => {
    return await apiRequest('/auth/profile', {
      method: 'PUT',
      body: userData,
    });
  },
};

// Товары
export const productsAPI = {
  // Получить все товары
  getAllProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiRequest(`/products?${queryParams}`);
  },

  // Получить товар по ID
  getProductById: async (id) => {
    return await apiRequest(`/products/${id}`);
  },

  // Поиск товаров
  searchProducts: async (searchTerm) => {
    return await apiRequest(`/products/search?q=${encodeURIComponent(searchTerm)}`);
  },

  // Получить товары по категории
  getProductsByCategory: async (category) => {
    return await apiRequest(`/products/category/${category}`);
  },

  // Получить популярные товары
  getFeaturedProducts: async () => {
    return await apiRequest('/products/featured');
  },
};

// Корзина
export const cartAPI = {
  // Получить корзину пользователя
  getCart: async () => {
    return await apiRequest('/cart');
  },

  // Добавить товар в корзину
  addToCart: async (productId, quantity = 1) => {
    return await apiRequest('/cart/add', {
      method: 'POST',
      body: { productId, quantity },
    });
  },

  // Обновить количество товара в корзине
  updateCartItem: async (productId, quantity) => {
    return await apiRequest('/cart/update', {
      method: 'PUT',
      body: { productId, quantity },
    });
  },

  // Удалить товар из корзины
  removeFromCart: async (productId) => {
    return await apiRequest('/cart/remove', {
      method: 'DELETE',
      body: { productId },
    });
  },

  // Очистить корзину
  clearCart: async () => {
    return await apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Избранное
export const favoritesAPI = {
  // Получить избранное
  getFavorites: async () => {
    return await apiRequest('/favorites');
  },

  // Добавить в избранное
  addToFavorites: async (productId) => {
    return await apiRequest('/favorites/add', {
      method: 'POST',
      body: { productId },
    });
  },

  // Удалить из избранного
  removeFromFavorites: async (productId) => {
    return await apiRequest('/favorites/remove', {
      method: 'DELETE',
      body: { productId },
    });
  },
};

// Заказы
export const ordersAPI = {
  // Создать заказ
  createOrder: async (orderData) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: orderData,
    });
  },

  // Получить заказы пользователя
  getUserOrders: async () => {
    return await apiRequest('/orders');
  },

  // Получить заказ по ID
  getOrderById: async (orderId) => {
    return await apiRequest(`/orders/${orderId}`);
  },
};

// Подписка на рассылку
export const newsletterAPI = {
  subscribe: async (email) => {
    return await apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: { email },
    });
  },
};

// Моковые данные для разработки (если бэкенд не готов)
export const mockAPI = {
  getProducts: async () => {
    // Возвращаем моковые данные
    return {
      products: [
        {
          id: 1,
          name: "Серьги Лунное сияние",
          price: 12500,
          images: ["/image/луна 1.jpg"],
          description: "Элегантные серьги ручной работы из серебра 925 пробы",
          material: "Серебро 925",
          category: "earrings",
          collection: "luna"
        },
        {
          id: 2,
          name: "Кольцо Звездная пыль", 
          price: 8900,
          images: ["/images/product2.jpg"],
          description: "Изящное кольцо с фианитами",
          material: "Серебро 925",
          category: "rings",
          collection: "solaris"
        },
        {
          id: 3,
          name: "Колье Солнечная энергия",
          price: 15600,
          images: ["/images/product3.jpg"],
          description: "Роскошное колье с подвеской",
          material: "Серебро 925",
          category: "necklaces", 
          collection: "solaris"
        },
        {
          id: 4,
          name: "Браслет Северное сияние",
          price: 11200,
          images: ["/images/product4.jpg"],
          description: "Стильный браслет с гравировкой",
          material: "Серебро 925",
          category: "bracelets",
          collection: "luna"
        }
      ]
    };
  },

  getProduct: async (id) => {
    const products = (await mockAPI.getProducts()).products;
    return products.find(product => product.id === parseInt(id)) || null;
  }
};

export default {
  auth: authAPI,
  products: productsAPI, 
  cart: cartAPI,
  favorites: favoritesAPI,
  orders: ordersAPI,
  newsletter: newsletterAPI,
  mock: mockAPI
};
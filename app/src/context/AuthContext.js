// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useModal } from './ModalContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { showModal } = useModal();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Создаем тестового пользователя при инициализации
  useEffect(() => {
    const initializeTestUser = () => {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const testUserExists = existingUsers.some(u => u.email === 'test@example.com');
      
      if (!testUserExists) {
        const testUser = {
          id: 'test-user-123',
          username: 'testuser',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        };
        
        const updatedUsers = [...existingUsers, testUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        console.log('Test user created:', testUser);
      }
    };

    // Загрузка данных из localStorage
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    const savedOrders = localStorage.getItem('orders');
    
    // Создаем тестового пользователя
    initializeTestUser();
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        console.log('User loaded from localStorage:', JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
        localStorage.removeItem('user');
      }
    }
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setCart(Array.isArray(cartData) ? cartData : []);
      } catch (error) {
        console.error('Error parsing cart:', error);
        localStorage.setItem('cart', JSON.stringify([]));
      }
    }
    if (savedFavorites) {
      try {
        const favoritesData = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(favoritesData) ? favoritesData : []);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        localStorage.setItem('favorites', JSON.stringify([]));
      }
    }
    if (savedOrders) {
      try {
        const ordersData = JSON.parse(savedOrders);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.error('Error parsing orders:', error);
        localStorage.setItem('orders', JSON.stringify([]));
      }
    }
  }, []);

  // ✅ Функция регистрации
  const register = (userData) => {
    try {
      console.log('Starting registration with:', userData);
      
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('Пользователь с таким email уже существует');
      }

      const newUser = {
        id: Date.now().toString(),
        username: userData.username || userData.email.split('@')[0],
        email: userData.email,
        createdAt: new Date().toISOString(),
        ...userData
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      console.log('Registration successful:', newUser);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // ✅ Функция входа
  const login = (email, password) => {
    try {
      console.log('Attempting login with email:', email);
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      console.log('Available users:', registeredUsers.map(u => u.email));
      
      const foundUser = registeredUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Пользователь с таким email не найден');
      }

      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      
      console.log('Login successful:', foundUser);
      return foundUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ✅ Функция быстрого входа тестового пользователя
  const quickLogin = () => {
    try {
      console.log('Quick login with test user');
      return login('test@example.com', 'password');
    } catch (error) {
      console.error('Quick login failed:', error);
      // Если тестового пользователя нет, создаем его
      const testUser = {
        id: 'test-user-123',
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date().toISOString()
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = [...existingUsers, testUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      setUser(testUser);
      localStorage.setItem('user', JSON.stringify(testUser));
      
      console.log('Test user created and logged in:', testUser);
      return testUser;
    }
  };

  // ✅ Функция выхода
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setCart([]);
    setFavorites([]);
    setOrders([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    localStorage.removeItem('orders');
  };

  // ✅ Функция добавления в корзину
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    let message = '';
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
       message = `Количество "${product.name}" увеличено!`;
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
      message = `"${product.name}" добавлен в корзину!`;
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showModal('cart', product, message);
    
  };

  // ✅ Функция удаления из корзины
  const removeFromCart = (productId) => {
    
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  
  };

  // ✅ Функция добавления в избранное
  const addToFavorites = (product) => {
    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      showModal('favorites', product, `"${product.name}" добавлен в избранное! ❤️`);
    }
    return false;
  };

  // ✅ Функция удаления из избранного
  const removeFromFavorites = (productId) => {
    const newFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // ✅ Функция проверки наличия в избранном
  const isInFavorites = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // ✅ Функции для заказов
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('ru-RU'),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
      status: 'pending',
      address: orderData.address,
      cardNumber: orderData.cardNumber,
      ...orderData
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    
    // Очищаем корзину
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    
    return newOrder;
  };

  // ✅ Функция отмены заказа
  const cancelOrder = (orderId) => {
    const newOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelled' }
        : order
    );
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    return newOrders;
  };

  // ✅ Функция проверки авторизации
  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    cart,
    favorites,
    orders,
    register,
    login,
    quickLogin,
    logout,
    isAuthenticated,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    createOrder,
    cancelOrder
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
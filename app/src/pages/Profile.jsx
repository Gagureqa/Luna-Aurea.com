import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

const Profile = () => {
  const { showModal } = useModal();
  const { 
    user, 
    logout, 
    cart, 
    removeFromCart, 
    favorites, 
    removeFromFavorites, 
    orders, 
    createOrder, 
    cancelOrder 
  } = useAuth(); // ✅ Добавляем недостающие функции
  
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [checkoutData, setCheckoutData] = useState({
    cardNumber: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Обработка параметров таба из URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    
    if (tab && ['cart', 'favorites', 'orders'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('profile');
    }
  }, [location.search]);

  // ✅ Функция для смены таба
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      navigate('/profile');
    } else {
      navigate(`/profile?tab=${tab}`);
    }
  };

  // ✅ Функция навигации в каталог
  const goToCatalog = () => {
    navigate('/catalog');
  };

  // ✅ Функция для перехода к товару
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // ✅ Функция для безопасного получения изображения
  const getProductImage = (product) => {
    if (!product || !product.images || product.images.length === 0) {
      return '/images/placeholder.jpg';
    }
    return product.images[0];
  };

  // ✅ Функция оформления заказа
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!cart || cart.length === 0) {
      alert('Корзина пуста!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Имитация обработки заказа
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ✅ Используем createOrder из AuthContext
      const order = createOrder(checkoutData);
      
      // Сбрасываем форму
      setCheckoutData({
        cardNumber: '',
        address: ''
      });
      
      // ✅ Показываем модальное окно успешного заказа
      showModal('order-success', null, 'Заказ успешно оформлен!', order);
      
    } catch (error) {
      alert('Произошла ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Функция отмены заказа
  const handleCancelOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите отменить этот заказ?')) {
      cancelOrder(orderId);
      alert('Заказ отменен');
    }
  };

  // ✅ Функция для получения статуса заказа
  const getOrderStatus = (status) => {
    const statuses = {
      pending: { text: 'В обработке', color: 'text-yellow-600', bg: 'bg-yellow-100' },
      completed: { text: 'Завершен', color: 'text-green-600', bg: 'bg-green-100' },
      cancelled: { text: 'Отменен', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return statuses[status] || statuses.pending;
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 text-center">
        <p className="text-lg mb-4">Пожалуйста, войдите в систему</p>
        <button 
          onClick={goToCatalog}
          className="bg-gold-600 text-white px-6 py-3 rounded hover:bg-gold-700"
        >
          Войти / Зарегистрироваться
        </button>
      </div>
    );
  }

  // ✅ Безопасный расчет общей суммы
  const totalPrice = cart ? cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Личный кабинет</h1>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex space-x-8">
          {['profile', 'cart', 'favorites', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-4 px-2 capitalize ${
                activeTab === tab 
                  ? 'border-b-2 border-gold-600 text-gold-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'profile' ? 'Профиль' : 
               tab === 'cart' ? 'Корзина' : 
               tab === 'favorites' ? 'Понравилось' : 'Мои заказы'}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Информация о профиле</h2>
            <div className="space-y-3">
              <p><strong>Имя пользователя:</strong> {user.username || 'Пользователь'}</p>
              <p><strong>Email:</strong> {user.email || 'Не указан'}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Выйти
            </button>
          </div>
        </div>
      )}

      {/* Cart Tab */}
      {activeTab === 'cart' && (
        <div>
          {!cart || cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">Корзина пуста</p>
              <button 
                onClick={goToCatalog}
                className="bg-gold-600 text-white px-6 py-3 rounded hover:bg-gold-700"
              >
                Перейти к покупкам
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Товары в корзине</h2>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center bg-white rounded-lg shadow-md p-4">
                      <img 
                        src={getProductImage(item)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() => goToProduct(item.id)}
                      />
                      <div className="ml-4 flex-grow">
                        <h3 
                          className="font-semibold cursor-pointer hover:text-gold-600"
                          onClick={() => goToProduct(item.id)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-gold-600 font-bold">{(item.price || 0).toLocaleString()} ₽</p>
                        <p className="text-gray-500 text-sm">Количество: {item.quantity || 1}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-4 p-2"
                      >
                        ✕ Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4">Оформление заказа</h2>
                <form onSubmit={handleCheckout}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Номер карты</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={checkoutData.cardNumber}
                        onChange={(e) => setCheckoutData({...checkoutData, cardNumber: e.target.value})}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                        maxLength="19"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Адрес доставки</label>
                      <textarea
                        placeholder="Введите полный адрес доставки"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString()} ₽</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !cart || cart.length === 0}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        isSubmitting || !cart || cart.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gold-600 hover:bg-gold-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ОФОРМЛЕНИЕ...
                        </div>
                      ) : (
                        '✅ ОФОРМИТЬ ЗАКАЗ'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Избранные товары</h2>
          {!favorites || favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">В избранном пока ничего нет</p>
              <button 
                onClick={goToCatalog}
                className="bg-gold-600 text-white px-6 py-3 rounded hover:bg-gold-700"
              >
                Перейти к покупкам
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={getProductImage(item)}
                    alt={item.name}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => goToProduct(item.id)}
                  />
                  <div className="p-4">
                    <h3 
                      className="font-semibold text-lg mb-2 cursor-pointer hover:text-gold-600"
                      onClick={() => goToProduct(item.id)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gold-600 font-bold text-xl mb-3">{(item.price || 0).toLocaleString()} ₽</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => goToProduct(item.id)}
                        className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Подробнее
                      </button>
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Удалить из избранного"
                      >
                        💔 Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Мои заказы</h2>
          {!orders || orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">У вас еще нет заказов</p>
              <button 
                onClick={() => handleTabChange('cart')}
                className="bg-gold-600 text-white px-6 py-3 rounded hover:bg-gold-700"
              >
                Перейти к корзине
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => {
                const status = getOrderStatus(order.status);
                return (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Заказ #{order.id}</h3>
                        <p className="text-gray-500 text-sm">Дата: {order.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                          {status.text}
                        </span>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                          >
                            Отменить заказ
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p><strong>Адрес доставки:</strong> {order.address}</p>
                      <p><strong>Карта:</strong> **** {order.cardNumber?.slice(-4)}</p>
                      <p><strong>Итого:</strong> {(order.total || 0).toLocaleString()} ₽</p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Товары в заказе:</h4>
                      <div className="space-y-3">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex items-center">
                            <img 
                              src={getProductImage(item)}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3 flex-grow">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {(item.price || 0).toLocaleString()} ₽ × {item.quantity || 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
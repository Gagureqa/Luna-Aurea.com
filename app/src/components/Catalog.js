// components/Catalog.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const { addToCart, addToFavorites, isInFavorites } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // База данных товаров (такая же как в ProductPage)
  const allProducts = [
    {
      id: 1,
      name: 'Кольцо Лунный свет',
      price: 8900,
      images: ['/images/moonlight1.png', '/images/moonlight2.png', '/images/moonlight3.png', '/images/moonlight4.png'],
      description: 'Изящное кольцо с фианитами, которые сверкают как звездная пыль.',
      material: 'Серебро 925',
      size: '17.5',
      weight: '10 г',
      category: 'rings',
      collection: 'luna',
      inStock: true
    },
    {
      id: 2,
      name: 'Серьги Лунное сияние',
      price: 12500,
      images: ['/images/луна 1.png', '/images/луна 2.png', '/images/луна 3.png', '/images/луна 4.png'],
      description: 'Элегантные серьги ручной работы из серебра 925 пробы с фианитами.',
      material: 'Серебро 925',
      length: '10 см',
      weight: '16 г',
      category: 'earrings',
      collection: 'luna',
      inStock: false
    },
    {
      id: 3,
      name: 'Колье Солнечная энергия',
      price: 25000,
      images: ['/images/колье1.png', '/images/колье2.png', '/images/колье3.png', '/images/колье4.png'],
      description: 'Роскошное колье с подвеской в виде солнца.',
      material: 'Золото 545',
      length: '45 см',
      weight: '700 г',
      category: 'necklaces',
      collection: 'solaris',
      inStock: true
    },
    // ... добавьте остальные товары из вашей базы
  ];

  // ✅ Обработка поискового запроса из URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    // Имитация загрузки данных
    setLoading(true);
    setTimeout(() => {
      setProducts(allProducts);
      
      let filtered = allProducts;
      
      // Применяем поисковый запрос если есть
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.collection.toLowerCase().includes(query)
        );
      }
      
      // Применяем фильтры по категории
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Применяем фильтры по коллекции
      if (selectedCollection !== 'all') {
        filtered = filtered.filter(product => product.collection === selectedCollection);
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [location.search, selectedCategory, selectedCollection]);

  // ✅ Функция для обработки поиска
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/catalog');
    }
  };

  // ✅ Функция добавления в корзину
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
  };

  // ✅ Функция добавления в избранное
  const handleAddToFavorites = (product, e) => {
    e.stopPropagation();
    if (isInFavorites(product.id)) {
      // Здесь можно добавить удаление из избранного если нужно
    } else {
      addToFavorites(product);
    }
  };

  // ✅ Функция перехода к товару
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'rings', label: 'Кольца' },
    { value: 'earrings', label: 'Серьги' },
    { value: 'necklaces', label: 'Колье' },
    { value: 'bracelets', label: 'Браслеты' },
    { value: 'sets', label: 'Комплекты' }
  ];

  const collections = [
    { value: 'all', label: 'Все коллекции' },
    { value: 'luna', label: 'LUNA' },
    { value: 'solaris', label: 'SOLARIS' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок и результаты поиска */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-4">
          Каталог украшений
        </h1>
        
        {/* Показываем результаты поиска */}
        {location.search.includes('search=') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              Результаты поиска: <strong>{filteredProducts.length}</strong> товаров
              {new URLSearchParams(location.search).get('search') && (
                <> по запросу "<strong>{new URLSearchParams(location.search).get('search')}</strong>"</>
              )}
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
            >
              ✕ Очистить поиск
            </button>
          </div>
        )}
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          {collections.map(collection => (
            <option key={collection.value} value={collection.value}>
              {collection.label}
            </option>
          ))}
        </select>
      </div>

      {/* Сетка товаров */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Товары не найдены</p>
          <p className="text-gray-600 mb-6">
            Попробуйте изменить поисковый запрос или параметры фильтрации
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg"
          >
            Показать все товары
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => goToProduct(product.id)}
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Нет в наличии
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {product.collection === 'luna' ? 'LUNA' : 'SOLARIS'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gold-600 font-bold text-xl mb-3">
                  {product.price.toLocaleString()} ₽
                </p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-gold-600 hover:bg-gold-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'В корзину' : 'Нет в наличии'}
                  </button>
                  <button
                    onClick={(e) => handleAddToFavorites(product, e)}
                    className={`p-2 rounded-full transition-colors ${
                      isInFavorites(product.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-gold-600'
                    }`}
                  >
                    {isInFavorites(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
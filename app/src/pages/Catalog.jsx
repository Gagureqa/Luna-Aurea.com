import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const { addToCart } = useAuth();

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts = [
      // Существующие продукты
      { id: 1, name: "Серьги Лунное сияние", price: 12500, image: "./images/луна 1.png", category: "earrings", collection: "luna" },
      { id: 2, name: "Кольцо Лунный свет", price: 8900, image: "/images/moonlight1.png", category: "rings", collection: "luna" },
      { id: 3, name: "Колье Солнечная энергия", price: 25000, image: "/images/колье1.png", category: "necklaces", collection: "solar" },
      { id: 4, name: "Браслет Северное сияние", price: 11200, image: "/images/браслетик1.png", category: "bracelets", collection: "polarlights" },
      { id: 5, name: "Кольцо Венера", price: 10590, image: "/images/венера1.jpg", category: "rings", collection: "planet" },
      { id: 6, name: "Серьги Марс", price: 15500, image: "/images/марс1.jpg", category: "earrings", collection: "planet" },
      { id: 7, name: "Колье Юпитер", price: 11900, image: "/images/юпитер1.jpg", category: "necklaces", collection: "planet" },
      { id: 8, name: "Браслет Сатурн", price: 11200, image: "/images/сатурн1.jpeg", category: "bracelets", collection: "planet" },
      { id: 9, name: "Браслет Золотое сияние", price: 19200, image: "/images/браслетсолар1.jpg", category: "bracelets", collection: "solar" },
      { id: 10, name: "Серьги Белое солнце", price: 19200, image: "/images/серёжкисолар1.jpg", category: "earrings", collection: "solar" },
      
    ];
    setProducts(mockProducts);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'popularity') return b.id - a.id; // Mock popularity
    return 0;
  });

  // Функция для получения товаров по коллекции
  const getProductsByCollection = (collectionName) => {
    return products.filter(product => product.collection === collectionName);
  };

  const polarLightsProducts = getProductsByCollection('polarlights');
  const planetProducts = getProductsByCollection('planet');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Заголовок и сортировка */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold">Все украшения</h1>
        
        <div className="relative w-full sm:w-auto">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 appearance-none bg-white border rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="">Сортировать</option>
            <option value="price">По цене</option>
            <option value="popularity">По популярности</option>
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow relative">
            {/* Бейдж коллекции */}
            {product.collection === 'polarlights' && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  Polar Lights
                </span>
              </div>
            )}
            {product.collection === 'planet' && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full">
                  Planet
                </span>
              </div>
            )}
            {product.collection === 'solar' && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-gradient-to-r from-gold-600 to-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                  Solaris
                </span>
              </div>
            )}
            {product.collection === 'luna' && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  Luna
                </span>
              </div>
            )}
            
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold mb-2 hover:text-gold-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex justify-between items-center">
                <p className="text-gold-600 font-bold text-lg">
                  {product.price.toLocaleString()} ₽
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Навигация по коллекциям */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-serif font-bold text-center mb-6">Все коллекции</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/collections/polarlights" 
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h4 className="font-serif font-bold text-lg mb-2">Polar Lights</h4>
            <p className="text-blue-100 text-sm">{polarLightsProducts.length} товаров</p>
          </Link>
          <Link 
            to="/collections/planet" 
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h4 className="font-serif font-bold text-lg mb-2">Planet</h4>
            <p className="text-purple-100 text-sm">{planetProducts.length} товаров</p>
          </Link>
          <Link 
            to="/collections/solaris" 
            className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h4 className="font-serif font-bold text-lg mb-2">Solar</h4>
            <p className="text-yellow-100 text-sm">{getProductsByCollection('solar').length} товаров</p>
          </Link>
          <Link 
            to="/collections/luna" 
            className="bg-gradient-to-br from-gray-400 to-blue-400 text-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h4 className="font-serif font-bold text-lg mb-2">Luna</h4>
            <p className="text-gray-100 text-sm">{getProductsByCollection('lunar').length} товаров</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
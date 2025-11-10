// Navbar.jsx - обновленная версия
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, cart } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${searchTerm}`);
      setIsMobileMenuOpen(false);
    }
  };

  const goToProfileTab = (tab) => {
    if (tab === 'profile') {
      navigate('/profile');
    } else {
      navigate(`/profile?tab=${tab}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="./images/logo.png" alt="LUNA AUREA" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-serif font-bold hidden sm:block">LUNA AUREA</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/catalog" className="text-gray-700 hover:text-gold-600 transition-colors">КАТАЛОГ</Link>
            <Link to="/collections" className="text-gray-700 hover:text-gold-600 transition-colors">КОЛЛЕКЦИИ</Link>
            <Link to="/about" className="text-gray-700 hover:text-gold-600 transition-colors">О НАС</Link>
            <Link to="/contacts" className="text-gray-700 hover:text-gold-600 transition-colors">КОНТАКТЫ</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - скрываем на очень маленьких экранах */}
            <form onSubmit={handleSearch} className="relative hidden xs:block">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 w-32 sm:w-40 lg:w-48"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                🔍
              </button>
            </form>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gold-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Profile */}
              {user ? (
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    👤
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => navigate('/profile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Мой профиль
                    </button>
                    <button
                      onClick={() => goToProfileTab('orders')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Мои заказы
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/auth" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  👤
                </Link>
              )}

              {/* Favorites */}
              <button 
                onClick={() => user ? goToProfileTab('favorites') : navigate('/auth')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ❤️
              </button>

              {/* Cart */}
              <button 
                onClick={() => user ? goToProfileTab('cart') : navigate('/auth')}
                className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
              >
                🛒
                {user && cart && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 pb-3">
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </form>
              
              <Link
                to="/catalog"
                className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                КАТАЛОГ
              </Link>
              <Link
                to="/catalog"
                className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                КОЛЛЕКЦИИ
              </Link>
              <Link
                to="/collecrions"
                className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О НАС
              </Link>
              <Link
                to="/contacts"
                className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                КОНТАКТЫ
              </Link>
              
              {/* Mobile Auth Actions */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-4">
                  {user ? (
                    <>
                      <button 
                        onClick={() => goToProfileTab('favorites')}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        ❤️
                      </button>
                      <button 
                        onClick={() => goToProfileTab('cart')}
                        className="p-2 hover:bg-gray-100 rounded-full relative"
                      >
                        🛒
                        {cart && cart.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {cart.length}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Выйти
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="text-gold-600 hover:text-gold-700 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Войти
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
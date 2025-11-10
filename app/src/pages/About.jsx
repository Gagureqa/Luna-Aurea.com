import React from 'react';

const About = ({ onNavigate }) => {
  // ✅ Функция безопасной навигации
  const safeNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page);
    } else {
      window.location.hash = page;
    }
  };

  const goToCatalog = () => {
    window.location.href = './collections/luna';
  };

  const goToContacts = () => {
    window.location.href = './contacts';
  };
  const goToCollections = () => {
    window.location.href = './collections';
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-gold-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">О LUNA AUREA</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Создаём уникальные ювелирные украшения, в которых каждая деталь рассказывает свою историю. 
            Наша философия — сочетание традиционного мастерства и современных тенденций.
          </p>
        </div>
      </section>

      {/* Наша история */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  LUNA AUREA родилась из страсти к искусству и желания создавать не просто украшения, 
                  а настоящие произведения искусства. Основанная в 2018 году, наша мастерская объединила 
                  опытных ювелиров и современных дизайнеров.
                </p>
                <p>
                  Мы начинались как небольшая семейная мастерская, а сегодня наши украшения 
                  украшают женщин по всей России. Каждое изделие проходит долгий путь от эскиза 
                  до готового украшения, наполняясь любовью и вниманием к деталям.
                </p>
                <p>
                  Название "LUNA AUREA" — "Золотая Луна" — отражает нашу философию: создавать 
                  украшения, которые подобно лунному свету, мягко подчеркивают естественную красоту.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <span className="text-6xl mb-4">🔮</span>
                  <p className="text-lg font-semibold">Наша мастерская</p>
                  <p className="text-sm">Место, где рождаются шедевры</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Наши ценности */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6">
              <div className="bg-gold-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Качество</h3>
              <p className="text-gray-600">
                Используем только сертифицированные материалы: серебро 925 пробы, 
                золото 585 пробы и натуральные камни
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-gold-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Уникальность</h3>
              <p className="text-gray-600">
                Каждое украшение создаётся вручную, что делает его эксклюзивным. 
                Вы не найдёте двух одинаковых изделий
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-gold-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Любовь к делу</h3>
              <p className="text-gray-600">
                Мы вкладываем душу в каждое изделие. Для нас это не просто работа — 
                это искусство и призвание
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Процесс создания */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">Как создаются наши украшения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">1</div>
              <h3 className="font-semibold text-gray-800 mb-2">Эскиз</h3>
              <p className="text-gray-600 text-sm">Создание дизайна и проработка каждой детали</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">2</div>
              <h3 className="font-semibold text-gray-800 mb-2">Моделирование</h3>
              <p className="text-gray-600 text-sm">Создание 3D-модели и подготовка к отливке</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">3</div>
              <h3 className="font-semibold text-gray-800 mb-2">Изготовление</h3>
              <p className="text-gray-600 text-sm">Ручная работа: отливка, шлифовка, полировка</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">4</div>
              <h3 className="font-semibold text-gray-800 mb-2">Контроль качества</h3>
              <p className="text-gray-600 text-sm">Тщательная проверка перед отправкой</p>
            </div>
          </div>
        </div>
      </section>

      {/* Коллекции */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">Наши коллекции</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Коллекция "LUNA"</h3>
              <p className="text-gray-600 mb-4">
                Нежные и элегантные украшения, вдохновлённые лунным светом и ночным небом. 
                Идеально для романтических образов и особых случаев.
              </p>
                <button 
                  onClick={goToCatalog}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Наши коллекции
                </button>
              
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Коллекция "SOLARIS"</h3>
              <p className="text-gray-600 mb-4">
                Яркие и смелые украшения, отражающие энергию солнца. 
                Для тех, кто не боится выделяться и любит быть в центре внимания.
              </p>
              <button 
                onClick={goToCollections}
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Смотреть коллекцию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Присоединяйтесь к миру LUNA AUREA</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Откройте для себя украшения, которые станут частью вашей уникальной истории
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={goToCatalog}
              className="bg-white text-gold-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Смотреть каталог
            </button>
            <button 
              onClick = {goToContacts}
              className="border-2 border-white text-white hover:bg-white hover:text-gold-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data');

// Создаем папку для данных
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

const readData = (filename) => {
  try {
    const filePath = path.join(dataPath, filename);
    if (!fs.existsSync(filePath)) {
      // Возвращаем начальные данные
      if (filename === 'products.json') {
        return getInitialProducts();
      }
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const writeData = (filename, data) => {
  try {
    const filePath = path.join(dataPath, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// Начальные данные товаров
const getInitialProducts = () => [
  {
    id: 1,
    name: "Серьги Лунное сияние",
    price: 12500,
    images: ["/images/product1.jpg"],
    description: "Элегантные серьги ручной работы из серебра 925 пробы с фианитами",
    material: "Серебро 925",
    category: "earrings",
    collection: "luna",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Кольцо Звездная пыль",
    price: 8900,
    images: ["/images/product2.jpg"],
    description: "Изящное кольцо с фианитами, идеально для повседневной носки",
    material: "Серебро 925",
    category: "rings",
    collection: "solaris",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Колье Солнечная энергия",
    price: 15600,
    images: ["/images/product3.jpg"],
    description: "Роскошное колье с подвеской в виде солнца",
    material: "Серебро 925",
    category: "necklaces",
    collection: "solaris",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Браслет Северное сияние",
    price: 11200,
    images: ["/images/product4.jpg"],
    description: "Стильный браслет с гравировкой узоров северного сияния",
    material: "Серебро 925",
    category: "bracelets",
    collection: "luna",
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Серьги Венера",
    price: 14300,
    images: ["/images/product5.jpg"],
    description: "Изящные серьги с жемчужными вставками",
    material: "Серебро 925 с жемчугом",
    category: "earrings",
    collection: "solaris",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Кольцо Марс",
    price: 9700,
    images: ["/images/product6.jpg"],
    description: "Смелое кольцо с красными вставками",
    material: "Серебро 925 с гранатом",
    category: "rings",
    collection: "solaris",
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "Колье Юпитер",
    price: 18900,
    images: ["/images/product7.jpg"],
    description: "Массивное колье с крупными элементами",
    material: "Серебро 925",
    category: "necklaces",
    collection: "solaris",
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: "Браслет Сатурн",
    price: 13400,
    images: ["/images/product8.jpg"],
    description: "Браслет с кольцевыми элементами",
    material: "Серебро 925",
    category: "bracelets",
    collection: "solaris",
    inStock: true,
    featured: false
  }
];

export const db = {
  products: {
    find: () => readData('products.json'),
    findById: (id) => {
      const products = readData('products.json');
      return products.find(product => product.id === parseInt(id));
    },
    findByCategory: (category) => {
      const products = readData('products.json');
      return products.filter(product => product.category === category);
    },
    search: (query) => {
      const products = readData('products.json');
      return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
  
  users: {
    find: () => readData('users.json'),
    findById: (id) => {
      const users = readData('users.json');
      return users.find(user => user.id === id);
    },
    findByEmail: (email) => {
      const users = readData('users.json');
      return users.find(user => user.email === email);
    },
    create: (userData) => {
      const users = readData('users.json');
      const newUser = {
        id: Date.now(),
        ...userData,
        cart: [],
        favorites: [],
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      writeData('users.json', users);
      return newUser;
    },
    update: (id, userData) => {
      const users = readData('users.json');
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        writeData('users.json', users);
        return users[index];
      }
      return null;
    }
  }
};
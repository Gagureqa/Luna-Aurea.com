import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './utils/database.js';

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = db.users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Пользователь с таким email уже существует' 
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = db.users.create({
      username,
      email,
      password: hashedPassword,
    });

    // Создаем JWT токен
    const token = jwt.sign(
      { id: user.id }, 
      'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Находим пользователя
    const user = db.users.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    // Создаем JWT токен
    const token = jwt.sign(
      { id: user.id },
      'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

export default router;
const express = require('express');
const app = express();
const PORT = 3000;

// Кастомний middleware для логування запитів
const requestLogger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${currentTime}] Method: ${method}, URL: ${url}`);
  next();
};

// Використовуємо middleware для кожного запиту
app.use(requestLogger);

// Middleware для парсингу JSON
app.use(express.json());

// Масив для зберігання користувачів
let users = [];

// Маршрут GET /
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Маршрут GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// Маршрут POST /users
app.post('/users', (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ error: 'Всі поля мають бути заповнені' });
  }
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Маршрут GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Обробка невизначених маршрутів
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
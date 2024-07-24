const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
const MenuItem = require('./models/MenuItem');
const Customer = require('./models/Customer');
const Order = require('./models/Orders');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:DataBase03@cluster0.waxzdtb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

// API Endpoints
app.get('/api/employees', authenticateJWT, async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/employees', authenticateJWT, async (req, res) => {
  const { name, employeeID, position, salary } = req.body;
  try {
    const employee = new Employee({ name, employeeID, position, salary });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/employees/:id', authenticateJWT, async (req, res) => {
  const { name, position, salary } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { name, position, salary }, { new: true });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/employees/:id', authenticateJWT, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Similar CRUD endpoints for Menu Items, Customers, and Orders can be created here...

// Authentication Endpoints
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database (assuming a User model exists)
  // const user = new User({ username, password: hashedPassword });
  // await user.save();

  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials (assuming a User model exists)
  // const user = await User.findOne({ username });
  // if (!user) return res.status(400).send('Invalid username or password');

  // const validPassword = await bcrypt.compare(password, user.password);
  // if (!validPassword) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ _id: user._id, username: user.username }, 'your_jwt_secret');
  res.header('Authorization', token).send('Logged in');
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
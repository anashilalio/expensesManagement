const express = require('express');
const cors = require('cors'); 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PrivateKey="shfhjsgefVGUGUY_è-_-/ML";
// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Set port
const PORT = process.env.PORT || 3000;
const url =  "mongodb+srv://anaslike41:GaIEGXYOkO7TQqmK@cluster0.f5cx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Define a simple route
app.get('/', (req, res) => {
  res.status(200).send('Hello, Express!');
});
app.get('/login', (req, res) => {
    res.status(200).send(', login!');
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const Schema = mongoose.Schema;
const userSchema = new Schema({
    FullName: { category: String, required: true },
    email: { category: String, required: true },
    password: { category: String, required: true },
    resetPasswordToken: { category: String },
    resetPasswordExpires: { category: Date }
  });

  // Define the expense schema
  const expenseSchema = new Schema({
    category: { category: String, required: true },
    amount: { category: String, required: true },
    name : {category : String  , required: false},
    date: { category: Date, required: true }
  });
  const budgetSchema = new Schema({
    category: { category: String, required: true },
    amount: { category: String, required: true },
    name : {category : String  , required: false}
  });
  
  // Create the Expense model
  const Expense = mongoose.model('Expense', expenseSchema);
  const Budget = mongoose.model('Budget', budgetSchema);




  // Create a model from the schema
  const User = mongoose.model('User', userSchema);
  
  // Define the registration route
  app.post('/api/register', async (req, res) => {
    try {
      const { FullName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ 
        FullName,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      var token = jwt.sign({ email: user.email, password: user.password }, PrivateKey, { expiresIn: '3h' });
      res.status(200).json({ message: 'Login successful!', tokens: token, email: user.email ,id:user.id,FullName:user.FullName,phoneNumber:user.phoneNumber,role:'client'});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/addExpense', async (req, res) => {
    try {
      const { category , amount , name, date } = req.body;
  
      // Create a new expense instance
      const newExpense = new Expense({
        category,
        amount,
        name ,
        date: new Date(date) 
      });
      await newExpense.save();
  
      res.status(201).json({ message: 'Expense added successfully!' });
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/addBudget', async (req, res) => {
    try {
      const { category , amount , name } = req.body;
  
      const newBudget = new Budget({
        category,
        amount,
        name 
      });
  
      await newBudget.save();
  
      res.status(201).json({ message: 'Budget added successfully!' });
    } catch (error) {
      console.error('Error adding budget:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })

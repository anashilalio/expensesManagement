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
    FullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  });

  const expenseSchema = new Schema({
    category: { type: String, required: true },
    amount: { type: String, required: true },
    name : {type : String  , required: false},
    date: { type: Date, required: true }
  });
  const budgetSchema = new Schema({
    category: { type: String, required: true },
    amount: { type: String, required: true },
    name : {type : String  , required: false}
  });

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of User references
  createdAt: { type: Date, default: Date.now }
});
const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the sender user
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the recipient user
  message: { type: String, required: true },  // Notification message content
  type: { 
    type: String, 
    enum: ['info', 'warning', 'error'], // Possible types of notifications
    required: true 
  },
  read: { type: Boolean, default: false },  // Indicates if the notification is read or not
  createdAt: { type: Date, default: Date.now },  // Timestamp of when the notification was created
});

const Notification = mongoose.model('Notification', notificationSchema);
const Community = mongoose.model('Community', communitySchema);

  const Expense = mongoose.model('Expense', expenseSchema);
  const Budget = mongoose.model('Budget', budgetSchema);
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
  app.post('/api/addCommunity', async (req, res) => {
    try {
      const { name, description, members } = req.body;
  
      // Create a new Community instance
      const newCommunity = new Community({
        name,
        description,
        members  // Pass in member IDs or references
      });
  
      await newCommunity.save();
  
      res.status(201).json({ message: 'Community added successfully!' });
    } catch (error) {
      console.error('Error adding community:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/communities', async (req, res) => {
    try {
      const communities = await Community.find().populate('members');
      res.status(200).json(communities);
    } catch (error) {
      console.error('Error fetching communities:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/sendNotification', async (req, res) => {
    try {
      const { sender, recipient, message, type } = req.body;
  
      const newNotification = new Notification({
        sender,
        recipient,
        message,
        type
      });
  
      await newNotification.save();
  
      res.status(201).json({ message: 'Notification sent successfully!' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/notifications/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.find({ recipient: userId }).populate('sender').sort({ createdAt: -1 });
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
    

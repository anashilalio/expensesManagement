const express = require('express');
const cors = require('cors'); // Import CORS middleware
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// qdd bycrpt js
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


// ------------------- user -------------------- //
const Schema = mongoose.Schema;
const userSchema = new Schema({
    FullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  });
  


  // Create a model from the schema
  const User = mongoose.model('User', userSchema);
  
  // Define the registration route
  app.post('/api/register', async (req, res) => {
    try {
      const { FullName, email, password } = req.body;
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new document with the request body data
      const newUser = new User({ 
        FullName,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // Define the login route
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
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

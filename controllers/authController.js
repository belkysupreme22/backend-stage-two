const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { username, email, role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Invalid username' });
    }

    console.log('Received password:', password);

    console.log('Hashed password from DB:', user.password);


    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    console.log('Password is valid:', isPasswordValid);  // Add this log to see the result
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


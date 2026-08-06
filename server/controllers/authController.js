const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Investor = require('../models/Investor');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, companyName, interestedIndustrySectors, interestedTechStacks } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    // Check if user already exists
    const existingStudent = await Student.findOne({ email });
    const existingInvestor = await Investor.findOne({ email });

    if (existingStudent || existingInvestor) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (role === 'Student') {
      newUser = new Student({
        name,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === 'Investor') {
      newUser = new Investor({
        name,
        email,
        password: hashedPassword,
        role,
        companyName,
        interestedIndustrySectors,
        interestedTechStacks,
      });
    } else {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check both models for the user
    let user = await Student.findOne({ email });
    if (!user) {
      user = await Investor.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      }
    };

    // Note: Secret should ideally be in process.env.JWT_SECRET
    const secret = process.env.JWT_SECRET || 'your_temporary_jwt_secret_key';
    
    jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

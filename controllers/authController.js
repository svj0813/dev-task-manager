const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Helper to sign JWT
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// 1. Signup
exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: { id: newUser._id, username: newUser.username }
            }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// 2. Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide username and password' });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect username or password' });
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// 3. Protect Middleware
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'You are not logged in!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'User no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
};
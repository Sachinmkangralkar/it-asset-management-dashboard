const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Standard authentication bouncer
const User = require('../models/User');

// --- GET /api/users ---
// Gets a list of all users. Only accessible to admins.
router.get('/', auth, async (req, res) => {
    // First, check if the logged-in user is an admin.
    // The user's info (including isAdmin) was added to req.user by the login route.
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    try {
        // Find all users but don't include their password hash in the response.
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- DELETE /api/users/:id ---
// Deletes a user by their ID. Only accessible to admins.
router.delete('/:id', auth, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    try {
        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        // Safety check: Prevent an admin from deleting their own account.
        if (userToDelete.id === req.user.id) {
            return res.status(400).json({ msg: 'You cannot delete your own admin account.' });
        }

        await userToDelete.deleteOne();
        res.json({ msg: 'User removed successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

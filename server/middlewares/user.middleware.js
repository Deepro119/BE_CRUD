export const validateUserInput = (req, res, next) => {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
        return res.status(400).json({ message: 'Missing required fields: name, email, address' });
    }
    if (!email.includes('@')) { 
        return res.status(400).json({ message: 'Invalid email format' });
    }
    next();
};
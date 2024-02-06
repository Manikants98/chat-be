"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const Users_1 = require("../../models/Users");
const useAuth = async (req, res, next) => {
    const withoutToken = ['/', '/upload', '/signup', '/signin'];
    if (withoutToken.includes(req.path)) {
        return next();
    }
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization is missing!' });
    }
    const user = await Users_1.User.findOne({ token });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authorization Token' });
    }
    next();
};
exports.useAuth = useAuth;

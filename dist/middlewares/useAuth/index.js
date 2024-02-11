"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const useAuth = async (req, res, next) => {
    const withoutToken = ['/', '/upload', '/signup', '/signin', '/socket', '/socket.io'];
    if (withoutToken.includes(req.path)) {
        return next();
    }
    const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: 'Authorization is missing!' });
    // }
    // const user = await User.findOne({ token });
    // if (!user) {
    //   return res.status(401).json({ message: 'Invalid Authorization Token' });
    // }
    next();
};
exports.useAuth = useAuth;

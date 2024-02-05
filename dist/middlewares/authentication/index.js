"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const useAuth = async (req, res, next) => {
    if (req.path === '/' || req.path === '/upload') {
        return next();
    }
    if (req.headers.authorization) {
        return next();
    }
    else {
        return res.status(401).json({ message: 'Authorization is missing!' });
    }
};
exports.useAuth = useAuth;

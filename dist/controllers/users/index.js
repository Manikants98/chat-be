"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFn = void 0;
// import { User } from '../../models/Users';
async function getUsersFn(req, res) {
    try {
        const message = 'Users Executed Successfully';
        // const users = await User.find();
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}
exports.getUsersFn = getUsersFn;

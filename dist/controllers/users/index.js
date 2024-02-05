"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFn = void 0;
const Users_1 = require("../../models/Users");
async function getUsersFn(req, res) {
    try {
        const message = "Users Executed Successfully";
        const users = await Users_1.User.find();
        res.status(200).json({ message, users });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}
exports.getUsersFn = getUsersFn;

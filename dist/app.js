"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongo_config_1 = __importDefault(require("./config/mongo.config"));
const socket2_1 = require("./controllers/socket2");
const useAuth_1 = require("./middlewares/useAuth");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 4000;
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, { cors: { allowedHeaders: '*' } });
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(mongo_config_1.default);
app.use(useAuth_1.useAuth);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(routes_1.default);
exports.io.on('connect', (socket) => {
    (0, socket2_1.socketFn)(socket);
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

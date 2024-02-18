"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Test_1 = require("./controllers/Test");
const routes_1 = __importDefault(require("./routes"));
const mongo_config_1 = __importDefault(require("./config/mongo.config"));
const useAuth_1 = require("./middlewares/useAuth");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(mongo_config_1.default);
app.use(useAuth_1.useAuth);
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use('/socket', (req, res) => {
    res.send('Socket event handler mounted on /socket');
});
io.on('connection', Test_1.testFn);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

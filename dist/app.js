"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
/**
 * Express is a Node.js web application framework that provides a robust set
 * of features to develop web and mobile applications.
 */
const express_1 = __importDefault(require("express"));
/**
 * http module provides the tools needed to create an HTTP server and interact
 * with HTTP messages.
 */
const http_1 = __importDefault(require("http"));
/**
 * Socket.IO enables real-time, bidirectional, and event-based communication
 * between web clients and servers.
 */
const socket_io_1 = require("socket.io");
/** Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express. */
const cors_1 = __importDefault(require("cors"));
/** Configuration module for connecting to MongoDB. */
const mongo_config_1 = __importDefault(require("./config/mongo.config"));
/** Controller function for handling socket connections. */
const socket2_1 = require("./controllers/socket2");
/** Middleware for user authentication. */
const useAuth_1 = require("./middlewares/useAuth");
/** Router module for defining application routes. */
const routes_1 = __importDefault(require("./routes"));
// Initialize Express app
const app = (0, express_1.default)();
// Set the port number
const port = 4000;
// Create an HTTP server using Express app
const server = http_1.default.createServer(app);
// Create a Socket.IO server and attach it to the HTTP server with CORS configuration
exports.io = new socket_io_1.Server(server, { cors: { allowedHeaders: '*' } });
// Enable CORS for all routes
app.use((0, cors_1.default)({ allowedHeaders: '*' }));
// Middleware for parsing URL-encoded request bodies
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware for parsing JSON request bodies
app.use(express_1.default.json());
// Middleware for connecting to MongoDB
app.use(mongo_config_1.default);
// Middleware for user authentication
app.use(useAuth_1.useAuth);
// Middleware for defining application routes
app.use(routes_1.default);
// Handle socket connections
exports.io.on('connect', (socket) => (0, socket2_1.socketFn)(socket));
// Start the HTTP server
server.listen(port, () => console.log(`Server is running on port ${port}`));

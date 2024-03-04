/**
 * Express is a Node.js web application framework that provides a robust set
 * of features to develop web and mobile applications.
 */
import express from 'express';

/**
 * http module provides the tools needed to create an HTTP server and interact
 * with HTTP messages.
 */
import http from 'http';

/**
 * Socket.IO enables real-time, bidirectional, and event-based communication
 * between web clients and servers.
 */
import { Server } from 'socket.io';

/** Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express. */
import cors from 'cors';

/** Configuration module for connecting to MongoDB. */
import useConnectDB from './config/mongo.config';

/** Controller function for handling socket connections. */
import { socketFn } from './controllers/socket2';

/** Middleware for user authentication. */
import { useAuth } from './middlewares/useAuth';

/** Router module for defining application routes. */
import route from './routes';

// Initialize Express app
const app = express();

// Set the port number
const port = 4000;

// Create an HTTP server using Express app
const server = http.createServer(app);

// Create a Socket.IO server and attach it to the HTTP server with CORS configuration
export const io = new Server(server, { cors: { allowedHeaders: '*' } });

// Enable CORS for all routes
app.use(cors({ allowedHeaders: '*' }));

// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for connecting to MongoDB
app.use(useConnectDB);

// Middleware for user authentication
app.use(useAuth);

// Middleware for defining application routes
app.use(route);

// Handle socket connections
io.on('connect', (socket) => socketFn(socket));

// Start the HTTP server
server.listen(port, () => console.log(`Server is running on port ${port}`));

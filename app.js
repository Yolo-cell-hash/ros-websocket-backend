const express = require('express');
const WebSocket = require('ws');
const ROSLIB = require('roslib');

const wss = new WebSocket.Server({ port: 9090 });
const app = express();
const port = 9090;

const clients = new Map();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Connect to the ROS WebSocket server
const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'  // Replace with the actual URL of your ROS WebSocket server.
});

ros.on('connection', () => {
    console.log('Connected to ROS');
});

ros.on('error', (error) => {
    console.error('Error connecting to ROS:', error);
});

ros.on('close', () => {
    console.log('Disconnected from ROS');
});

// Handle WebSocket connections with clients
wss.on('connection', (ws) => {
    console.log('A client connected');

    // Store the WebSocket connection in your 'clients' Map
    clients.set(ws, true);

    ws.on('message', (message) => {
        // Handle incoming messages from clients

        // You can send data to ROS here using roslibjs
        // For example:
        const cmdVel = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist',
        });

        const twist = new ROSLIB.Message({
            linear: {
                x: 0.1,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
            },
            encoding: 'ascii',
        });

        console.log(`Sending ROS message: ${JSON.stringify(twist)}`);
        cmdVel.publish(twist);
    });

    ws.on('close', () => {
        // Remove the WebSocket connection from the 'clients' Map
        clients.delete(ws);
        console.log('A client disconnected');
    });
});

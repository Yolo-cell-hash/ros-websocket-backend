const rosnodejs = require('rosnodejs');
const https = require('https'); // Use the 'https' module for secure connections

// Initialize ROS node
rosnodejs.initNode('/ros_listener_node')
  .then((rosNode) => {
    // Create a ROS subscriber
    const sub = rosNode.subscribe('/topic1', 'std_msgs/Float64', (data) => {
      // Handle incoming data
      sendDataToBackend(data);
    });

    // Function to send data to the Node.js backend
    function sendDataToBackend(data) {
      // Create a JSON payload with the data
      const payload = JSON.stringify({ data: data });

      // Configure the HTTP request options
      const options = {
        hostname: 'calm-pink-spider-tux.cyclic.app', // Update this line with your deployed website address
        port: 443, // Default port for HTTPS
        path: '/',
        method: 'POST',
        protocol: 'https:', // Set the protocol to 'https'
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length,
        },
      };

      // Send the data to the backend server using 'https'
      const req = https.request(options, (res) => {
        console.log(`Backend server responded with status code: ${res.statusCode}`);
      });

      req.on('error', (error) => {
        console.error(`Error sending data to backend: ${error.message}`);
      });

      req.write(payload);
      req.end();
    }
  });

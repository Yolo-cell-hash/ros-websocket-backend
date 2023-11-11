const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.render('home');
});



app.use(bodyParser.json());

// Define a route to handle incoming data
app.post('/', (req, res) => {
  const receivedData = req.body.data;
  console.log('Received data from ROS:', receivedData);
  // Handle the data as needed

  // Send a response
  res.status(200).send('Data received successfully');
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

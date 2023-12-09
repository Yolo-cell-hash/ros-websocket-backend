const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Added CORS middleware

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let dataHistory = [];

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:11311', // Replace with your ROS bridge domain
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    const receivedData = req.body.data;
    console.log('Received data:', receivedData);

    dataHistory.push(receivedData);
    console.log('Data history:', dataHistory);

    res.redirect('/res');
  } catch (error) {
    console.error('Error processing POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', function (req, res) {
  res.render('root');
});

app.get('/res', function (req, res) {
  res.render('home', { dataHistory: dataHistory });
});

let port = process.env.PORT || 3000; // Updated port configuration

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

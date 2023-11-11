const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let dataHistory = [];



app.use(bodyParser.json());

app.post('/', (req, res) => {
  const receivedData = req.body.data;
  dataHistory.push(receivedData);

  // Render the EJS view with the received data
  res.render('home',  { dataHistory: dataHistory });
});

app.get('/',function(req,res){
  res.render('root');
})



// Start the backend server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

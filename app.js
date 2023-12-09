const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let dataHistory = [];



app.use(bodyParser.json());

app.post('/', (req, res) => {
  const receivedData = req.body.data;
  dataHistory.push(receivedData);

  res.redirect('/res');
});



app.get('/',function(req,res){
  res.render('root');
})

app.get('/res',function(req,res){
  res.render('home', { dataHistory: dataHistory });
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

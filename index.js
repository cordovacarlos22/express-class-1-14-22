const express = require('express');
const app = express();

app.use(express.json()); //! when using body post

//? get function
app.get('/', (req, res) => {
  res.send('api de prueva de carlos')
});

//? add user or submit info to server con query method 
app.post('/useradded', (req, res) => {
  console.log(req.query);
  res.end()


});

//? add user or submit info to server con post  pararms method 
app.post('/useradded2/:nombre/:edad/', (req, res) => {
  console.log(req.params);
  res.end();
});

//? add user or submit info to server con post  body method 
app.post('/useradded3', (req, res) => {
  console.log(req.body);
  res.end();
});










app.listen('4000', () => {
  console.log("el server esta corriento en el puerto 4000");
});








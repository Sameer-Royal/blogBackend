var express = require('express');
const cors = require("cors");
var path = require('path');
const fileUpload = require("express-fileupload")
const { json } = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({createParentPath:true}));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/blogs', require('./routes/blog'));

app.all('**',(req,res)=>{
  res.send('i have nothing on root')
});

app.listen(8000,()=>{
  console.log('server is listening on 8000 port')
})

module.exports = app;

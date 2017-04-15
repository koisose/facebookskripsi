var express = require('express')
var app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs');

//untuk menjadikan json
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var koneksi=require("./koneksi")
app.get('/goal', function (req, res) {
  res.sendFile(__dirname+'/view/panda.html')
})

app.get('/', function (req, res) {
  res.render(__dirname+"/view/material")
  })
  app.post('/pertanyaanecommerce', jsonParser, function (req, res) {
  console.log(req.body)
  koneksi.simpan("pertanyaanecommerce",req.body)
  res.send(JSON.stringify(req.body)).status(200)

})
app.get('/pertanyaanecommerce/',  function (req, res) {
   koneksi.cari("pertanyaanecommerce",req.query,function(data){
  res.send(data).status(200)  
  })
})
app.post('/deletepertanyaanecommerce/', jsonParser, function (req, res) {
  koneksi.hapus("pertanyaanecommerce",req.body.id,data=>{
    res.send(data).status(200)
  })
})
app.post('/editpertanyaanecommerce/', jsonParser, function (req, res) {
  koneksi.update("pertanyaanecommerce",req.body._id,req.body.berubah,data=>{
    res.send(data).status(200)
  })
})
app.post('/pertanyaanbimbingan', jsonParser, function (req, res) {
  console.log(req.body)
  koneksi.simpan("bimbingan",req.body)
  res.send(JSON.stringify(req.body)).status(200)

})
app.get('/pertanyaanbimbingan/:pembimbing', jsonParser, function (req, res) {
  console.log(req.body)
  koneksi.cari("bimbingan",{pembimbing:req.params.pembimbing},function(data){
  res.send(data).status(200)  
  })
})
app.get('/material',  function (req, res) {
  res.render(__dirname+"/view/bimbingan")
})
app.get('/langsung',  function (req, res) {
  res.render(__dirname+"/view/langsung")
})
//pertanyaan dan mencoba tf idf
app.get('/pertanyaan', function (req, res) {
  res.sendFile(__dirname+'/view/pertanyaan.html')
})
//webhook mendapatkan notifikasi facebook
app.post('/facebook', jsonParser, function (req, res) {
  res.send("berhasil").status(200)

})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port '+process.env.PORT)
})
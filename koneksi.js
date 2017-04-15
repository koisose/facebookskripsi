var url = 'mongodb://panda:1234@ds135800.mlab.com:35800/panda';
var collections = []
var mongojs=require("mongojs")
var db = mongojs(url,collections);
var pencarian=function(nama,koleksi,fungsi){
  if(koleksi._id){
db.collection(nama).find({_id:db.ObjectId(koleksi._id)}, function(err, users) {
if(typeof(users)!= "undefined" && users.length>0){
  fungsi(users)
}else{
  
  fungsi([])
}
})    
  }
  else{
    db.collection(nama).find(koleksi, function(err, users) {
if(typeof(users)!= "undefined" && users.length>0){
  fungsi(users)
}else{
  
  fungsi([])
}
})
  }
 
}


var simpan=function(nama,koleksi){
 db.collection(nama).save(koleksi, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");

   
 }); 
}
// simpan("user",{nama:"cebum",user:"panda"})

var update=function(nama,kondisi,berubah,selesai){
  db.collection(nama).update({_id:db.ObjectId(kondisi)}, {$set: berubah}, {multi: true}, function (data) {
    console.log("saved")
    pencarian(nama,{},data=>{
      selesai(data)
    })
})
}
var hapus=function(nama,kondisi,selesai){
db.collection(nama).remove({_id:db.ObjectId(kondisi)}, {}, function(data,panda){
  if(!data){
    console.log("sukses menghapus")
    pencarian(nama,{},data=>{
      selesai(data)
    })
  }else{
    selesai("error: "+panda)
  }
// pencarian(nama,{},(data)=>{
//   console.log(data)
// })
  
})
  }
var hapusKoleksi=function(nama){
 
  db.collection(nama).drop(function(data){
    console.log(data)
  })
}  


var semuaKoleksi=function(panda){db.getCollectionNames(function(err, colNames) {
if (err) return console.log(err);
panda(colNames)
});}
module.exports={
  cari:pencarian,
  simpan:simpan,
  update:update,
  hapus:hapus,
  semuaKoleksi:semuaKoleksi,
  hapusKoleksi:hapusKoleksi
}
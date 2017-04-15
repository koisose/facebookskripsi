var koneksi = require('./koneksi')
koneksi.cari("pertanyaan",{},function(data){
    console.log(data.length)
})

var pertanyaan={}
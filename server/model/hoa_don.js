import connection from "../common/connect.js";


const hoa_don=function(hoa_don){
    this.id= hoa_don.id;
    this.id_khach_hang= hoa_don.id_khach_hang;
    this.id_xe= hoa_don.id_xe;
    this.ngay_dat= hoa_don.ngay_dat;
    this.ngay_nhan= hoa_don.ngay_nhan;
}

hoa_don.getAllHD= function(id_kh,result){
    connection.query("select * from hoa_don where id_khach_hang= ?", id_kh, (err, resdata)=>{
        if(err) throw err;
        result(resdata);
    })
}

hoa_don.insert = function(data, result) {
    connection.query(
      'insert into hoa_don (id_khach_hang, id_xe) value (?, ?) ',
      [data.id_khach_hang, data.id_xe],
      (err, results) => {
        if(err) throw err;
        console.log(results);
        result(results);
        
      }
    );
  };
  
hoa_don.getAllIdHoaDon= function(id,result){
    console.log(id);
    connection.query("SELECT FROM hoa_don INNER JOIN xe ON hoa_don.id_xe = xe.id WHERE hoa_don.id = ? ", id ,function(err,hoa_don){
        console.log(err,hoa_don)
        if(err)
        {
            result(null);
        }else{
            result(hoa_don);
        }
    });
    
} 

export default hoa_don;
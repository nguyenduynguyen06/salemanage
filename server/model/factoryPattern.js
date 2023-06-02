class Data{
    getData(){} 
}

import connection from "../common/connect.js";

export function queryData(type){
    switch (type){
        case 'danhmuc':
            return getDanhMuc;
        case 'xe':
            return getXe;
        case 'hangxe':
            return getHangXe;
        default:
            throw new Error('Invalid component type'); 
    }
}

const getDanhMuc={
    getData(){
        return new Promise((resolve, reject)=>{
            connection.query("select * from danh_muc_xe", (err, results)=>{
                if(err) throw err; 
                resolve(results);
                });
        })  
    } 
};

const getXe={
    getData(){
        return new Promise((resolve, reject)=>{
            connection.query("SELECT xe.*, anh_xe.lien_ket_anh FROM xe LEFT JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe ) AS anh_xe ON xe.id = anh_xe.id_xe", (err, results)=>{
                if(err) throw err; 
                resolve(results);
            });
        })
    }
};

const getHangXe={
    getData(){
        return new Promise((resolve, reject)=>{
            connection.query("select * from hang_xe", (err, results)=>{
                if(err) throw err; 
                resolve(results);
            });
        })
    }   
}
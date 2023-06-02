import hoa_don from "../model/hoa_don.js";
import _JWT from "../common/_JWT.js";

export const getAllHD= async function(req, res){

    var tokenKH= req.headers.authorization;
    const dataKH= await _JWT.check(tokenKH);
    
    // console.log(dataKH.data[0]['id']);
    if(dataKH != null){
        const id_KH= dataKH.data[0]['id'];
        hoa_don.getAllHD(id_KH, (result)=>{
        res.status(200).json({ success: true , hoa_don: result});   
        })
    }
}
export const insertHoaDon = async function(req, res) {

    var tokenKH= req.headers.authorization;
    const dataKH= await _JWT.check(tokenKH);

    const data = req.body;

    const dataInsert= {
        id_khach_hang: dataKH.data[0]['id'],
        id_xe: data.id_xe,
        ngay_dat: data.ngay_dat,
        ngay_nhan: data.ngay_nhan
    }


    console.log(dataInsert);
    hoa_don.insert(dataInsert, (result) => {
    
        const affectRow= result.affectedRows;
        console.log(affectRow);
        if (affectRow>=1) {
            res.status(200).json({success: true,message: 'Thêm hoá đơn thành công' });
        } else {
            res.status(404).json({success: false,message: 'Thêm hoá đơn không thành công' });
        }
    })
}
export const getIdHoaDon = function(req, res){
    hoa_don.getAllIdHoaDon(req.params.id,function(response){
         res.status(200).json(response);
    });
}
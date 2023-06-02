import { DanhMucProxy, DanhMucAdapter } from '../model/danhmuc.js';
import xe from "../model/xe.js";
import { HangXeProxy } from '../model/hangxe.js';
import {queryData} from '../model/factoryPattern.js'
export const getHomepage = async (req, res) => {

  const queryXe=  queryData('xe');
  const dataXe= await queryXe.getData();

  const queryDanhMuc= queryData('danhmuc');
  const dataDM= await queryDanhMuc.getData();

  const queryHangXe= queryData('hangxe');
  const dataHX= await queryHangXe.getData();

  return res.render('homePage.ejs', {dataXe: dataXe, dataDM: dataDM, dataHX: dataHX});
};
export const getDetailXe= (req, res)=>{
    
    let id_xe= req.params.id_xe;
    // console.log(">>>Check request params", id_xe);
    xe.getDetailXeById(id_xe, (result)=> {
        // console.log(">>>Check details Xe", result);
        return res.render('detailsXe.ejs', {detailsXe: JSON.stringify(result)});
    })
   
}
export const addXe= (req, res)=>{
  console.log(">>>Check post method",req.body);
  return res.redirect('/web/home')

}
const decorator = (originalFn) => {
    return (req, res) => {
      let id = req.params.id;
    
      DanhMucProxy.getAllIdDanhMuc(id, (result) => {
        let danhmucXe = result;
    
        DanhMucProxy.getAll((danhmucData) => {
          HangXeProxy.getAll((hangxeData) => {
            const data = {
              danhmucXe: danhmucXe,
              dataDanhmuc: danhmucData,
              dataHangxe: hangxeData
            };
    
    
            originalFn(req, res, data);
          });
        });
      });
    };
  };
  

  const getAllIdDanhMuc = (req, res, data) => {
    res.render('danhmucXe.ejs', data);
  };
  const getAlldanhmuc = (req, res, data) => {
    res.render('dsDanhmuc.ejs', data);
  };

  const decoratedGetAllIdDanhMuc = decorator(getAllIdDanhMuc);
  const decoratedGetAllDanhMuc = decorator(getAlldanhmuc);
 
  export { decoratedGetAllIdDanhMuc as getAllIdDanhMuc };
  export { decoratedGetAllDanhMuc as getAlldanhmuc };


  const decorator1 = (originalFn) => {
    return (req, res) => {
      let id = req.params.id;
  
      HangXeProxy.getAllIdHangXe(id, (result) => {
        let hangxe = result;
  
        DanhMucProxy.getAll((danhmucData) => {
          HangXeProxy.getAll((hangxeData) => {
            const data = {
              idHangXe: hangxe,
              dataDanhmuc: danhmucData,
              dataHangxe: hangxeData
            };
  
            originalFn(req, res, data);
          });
        });
      });
    };
  };
  
  const getAllIdHangXe = (req, res, data) => {
    res.render('hangXe.ejs', data);
  };
  
  const decoratedGetAllIdHangXe = decorator1(getAllIdHangXe);
  
export { decoratedGetAllIdHangXe as getAllIdHangXe };
  

const addDanhMuc = (req, res) => {
  const danhMucData = {
    ten_danh_muc: req.body.ten_danh_muc,
    anh_dai_dien: req.file.path, // Sử dụng đường dẫn file tải lên
  };

  const danhMucAdapter = new DanhMucAdapter();
  danhMucAdapter.addDanhMuc(danhMucData, (err, danhMuc) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi thêm danh mục.');
    } else {
      res.redirect('/web/danhmuc');
    }
  });
};

export { addDanhMuc };
const deleteDanhMuc = (req, res) => {
  const danhMucId = req.params.id;

  const danhMucAdapter = new DanhMucAdapter();
  danhMucAdapter.deleteDanhMuc(danhMucId, (err, isDeleted) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi xoá danh mục.');
    } else {
      if (isDeleted) {
        res.redirect('/web/danhmuc');
      } else {
        res.status(404).send('Không tìm thấy danh mục.');
      }
    }
  });
};

export { deleteDanhMuc };



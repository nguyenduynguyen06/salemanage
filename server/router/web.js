import express from "express";
import { getHomepage, getDetailXe, getAllIdDanhMuc, getAllIdHangXe ,addDanhMuc, getAlldanhmuc, deleteDanhMuc} from "../controller/homePage.js";
import path from 'path';
const router= express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/web/danhmuc/add', upload.single('anh_dai_dien'), addDanhMuc);
router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
router.get('/web/danhmuc/:id',getAllIdDanhMuc);
router.get('/web/danhmuc',getAlldanhmuc);
router.get('/web/hangxe/:id',getAllIdHangXe);
router.get('/web/danhmuc/xoa/:id', deleteDanhMuc);
export default router;
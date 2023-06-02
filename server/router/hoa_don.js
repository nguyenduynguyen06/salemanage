import express from 'express';
import {getAllHD,getIdHoaDon,insertHoaDon} from '../controller/hoa_don.js'
const router= express.Router();

router.get('/hoadon', getAllHD);
router.post('/themhoadon',insertHoaDon);
router.get('/hoadon/:id', getIdHoaDon);

export default router;
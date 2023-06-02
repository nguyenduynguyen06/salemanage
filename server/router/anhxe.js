import express from 'express';
import {getIdAnhXe} from '../controller/anhxe.js'
const router= express.Router();

router.get('/anhxe/:id', getIdAnhXe);

export default router;
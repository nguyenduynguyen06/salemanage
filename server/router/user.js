import express from 'express';
import _jwt from '../common/_JWT.js'
import {signIn,signUp} from '../controller/user.js';
const router= express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

// router.get('/token', async function(req, res){
//     var user= {
//         name: 'nguyenn',
//         email: 'jkljaklg',
//     };
//     const _jwttoken= await _jwt.make(user);
//     res.send({token: _jwttoken});
// });
// router.get('/token_check', async function(req, res){
//     try{
//         var token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJuZ3V5ZW5uIiwiZW1haWwiOiJqa2xqYWtsZyJ9LCJpYXQiOjE2ODI3Nzg4MjcsImV4cCI6MTY4Mjc4MjQyN30.v_s3JNKtTOUhd3-vhFXxKNas8iIE5rRSDzwU12w2o3Y"
//         const data= await _jwt.check(token);
//         console.log(data.data.name);
//         res.send({data: data});
//     }
//     catch(err){
//         res.send({data: "Mã token không hợp lệ"});
//     }
// })

export default router;
import jwt from 'jsonwebtoken';
import _app from './_APP.js';

let make= (user)=>{
    return new Promise(function(resolve, reject){
        jwt.sign({data: user}, _app.ACCESS_TOKEN,{
            algorithm: "HS256",
            expiresIn: _app.TOKEN_TIME_LIFE
        },
        function (err, _token){
            if(err){
                return reject(err);
            }
            return resolve(_token);
        }
        );
    })
};

let check= function(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, _app.ACCESS_TOKEN, function(err, data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
}
export default {make, check};
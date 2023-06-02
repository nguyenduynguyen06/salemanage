import _JWT from './_JWT.js';

let isAuth= async function (req, res, next){
    var _token= req.headers.authorization;
    if(_token){
        try{
            var authData= await _JWT.check(_token);
            req.auth= authData;
            next();

        }catch(err){
            return res.send({data: "Token không hợp lệ"});
        }

    }else{
        return res.send({data: "Chưa truyền token"});
    }
}

export default {isAuth};
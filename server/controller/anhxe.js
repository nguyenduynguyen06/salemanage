import anhxe from '../model/anhxe.js';

export const getIdAnhXe = function(req, res){
    anhxe.getAllIdAnhXe(req.params.id,function(response){
         res.send(response);
    });
}

import xe from '../model/xe.js';
export const getXe= (req, res)=>{
    xe.getAll((data)=>{
        res.status(200).json({xe: data});
    });
}

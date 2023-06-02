import express from 'express';

const configViewEngine= (app)=>{
    app.use(express.static('../server/public'));
    app.set("view engine", "ejs");
    app.set("views", "../server/views")
}

export default configViewEngine;
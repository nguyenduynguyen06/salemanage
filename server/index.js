import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import xe from './router/xe.js'
import anhxe from './router/anhxe.js'
import user from './router/user.js';
import hoa_don from './router/hoa_don.js';
import web from './router/web.js';

const app= express();
const PORT= process.env.port || 5000;

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());


configViewEngine(app);
app.use('/', web);
app.use('/', anhxe);
app.use('/xe', xe);
app.use('/', user);
app.use('/', hoa_don);
app.use
app.listen( PORT, ()=>{
    console.log("Running server...")
});

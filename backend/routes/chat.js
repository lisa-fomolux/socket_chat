const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');

const getChat=exports.getChat=(req, res, next)=>{
    res.send('get chat');
}
const addChat=exports.addChat=(req, res, next)=>{
    res.send('add chat')
}
const delChat=exports.delCaht=(req, res, next)=>{
    res.send('del chat')
}
// router.get('/', (req, res)=> res.send('chat.js'))
router
    .route('/')
    .get(getChat)
    .post(addChat);

router
    .route('/:id')
    .delete(delChat);

module.exports=router;


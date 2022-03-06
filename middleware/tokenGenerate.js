const jwt =require('jsonwebtoken');
const key=require('../config/key.json')

module.exports=(info)=>{
    const token=jwt.sign({info},key.unique);
    return token;
}
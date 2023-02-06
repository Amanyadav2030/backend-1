const accessFile = require('../access.json');
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 
const mainKey = process.env.MAINKEY;
async function Authorization(req,res,next){
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).send("Not authorised");
        }
        const decode = jwt.decode(token);
        const role = accessFile.find((el)=>el.role==decode.role);
        if(role.access.data.includes('R') && role.access.data.includes('C') && role.access.data.includes('U') && role.access.data.includes('D')){
            next();    
        }else {
           return res.status(401).send("Not authorised");
        }    
    }catch(e){
        res.status(501).send(e.message)
    }
};
module.exports= Authorization;
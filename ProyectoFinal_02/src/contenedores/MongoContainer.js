import mongoose from "mongoose";
import URL from "../config/MongoDB.js"

class MongoContainer{
    constructor(){

    }
    async connect(){
        try{
            let res = await mongoose.connect(URL,{
                useNewUrlParser:true,
                UseUnifiedTopology:true
            });
            console.log(`Conectado a la DB`)
        }catch(err){
            throw new Error(err);
        }
    }
    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log(`DB desconectada`);
        }catch(err){
            throw new Error(err);
        }
    }
}

export default MongoContainer;
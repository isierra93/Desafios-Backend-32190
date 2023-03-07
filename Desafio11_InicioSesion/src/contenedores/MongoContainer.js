import mongoose from "mongoose";
import URL from "../config/MongoURL.js";

class MongoContainer{
    constructor(){

    };
    async connect(){
        try{
            await mongoose.connect(URL,{
                useNewUrlParser:true,
                UseUnifiedTopology:true
            });
            console.log(`Conectado a la DB : ${URL}`);
        }catch(err){
            throw new Error(err);
        };
    }
    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log(`DB desconectada`);
        }catch(err){
            throw new Error(err);
        };
    };
};

export default MongoContainer;
import mongoose from "mongoose";
import {DOT_ENV} from "../config/config.js";
import * as logger from "../logger/logger.js";

class MongoContainer{
    constructor(){

    };
    async connect(){
        try{
            await mongoose.connect(DOT_ENV.URL,{
                useNewUrlParser:true,
                UseUnifiedTopology:true
            });
            logger.logConsola.info(`Conectado a la DB : ${DOT_ENV.URL}`);
        }catch(err){
            throw new Error(err);
        };
    }
    async disconnect(){
        try{
            await mongoose.disconnect();
            logger.logConsola.info(`DB desconectada`);
        }catch(err){
            throw new Error(err);
        };
    };
};

export default MongoContainer;
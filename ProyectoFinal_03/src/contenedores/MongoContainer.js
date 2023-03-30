import mongoose from "mongoose";

class MongoContainer{
    constructor(){
        mongoose.set('strictQuery', false)
    };
    async connect(){
        try{
            await mongoose.connect(process.env.MONGO_URL,{
                useNewUrlParser:true,
                UseUnifiedTopology:true,
            });
            console.log(`Conectado a la DB : ${process.env.MONGO_URL}`);
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
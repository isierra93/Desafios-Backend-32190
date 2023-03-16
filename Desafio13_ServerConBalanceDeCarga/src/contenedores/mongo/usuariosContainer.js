import MongoContainer from "../MongoContainer.js";
import * as model from "../../models/usuarios.js";

class Usuarios extends MongoContainer {
    constructor() {
        super();
    }
    //Trae todos los usuarios
    async getAll() {
        try {
            await this.connect();
            let res = await model.usuarios.find();
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    }
    //Trae usuario por ID
    async getByEmail(email){
        try{
            await this.connect();
            let res = await model.usuarios.findOne({username:email});
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    }
    //Agregar un usuarios
    async addUser(obj){
        try{
            await this.connect();
            await model.usuarios(obj).save();
            return obj;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    };
};

const usuariosDB = new Usuarios();

export default usuariosDB;

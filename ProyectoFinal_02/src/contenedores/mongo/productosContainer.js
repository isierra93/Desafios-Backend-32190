import MongoContainer from "../MongoContainer.js";
import * as model from "../../models/productos.js";

export class Productos extends MongoContainer {
    constructor() {
        super();
    }
    //Trae todos los productos
    async getAll() {
        try {
            await this.connect();
            let res = await model.productos.find();
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    }
    //Trae producto por ID
    async getById(id){
        try{
            await this.connect();
            let res = await model.productos.find({_id:id});
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    }
    //Agregar un producto
    async addProd(obj){
        try{
            await this.connect();
            await model.productos(obj).save();
            return obj;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    };
    //Modificar producto
    async updateProd(id, obj){
        try{
            await this.connect();
            let res = await model.productos.updateOne({_id:id},obj);
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    };
    //Borrar un producto por ID
    async deleteById(id){
        try{
            await this.connect();
            let res = await model.productos.deleteOne({_id:id});
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    };
};
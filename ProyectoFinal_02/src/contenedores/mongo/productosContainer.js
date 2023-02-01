import MongoContainer from "../MongoContainer";
import * as model from "../../models/productos.js";

export class Productos extends MongoContainer {
    constructor() {
        super();
    }
    //Trae todos los productos
    async getAll() {
        try {
            this.connect();
            let res = await model.productos.find();
            this.disconnect();
            return res;
        }catch(err){
            throw new Error(err);
        }
    }
    //Trae producto por ID
    async getById(id){
        try{
            this.connect();
            let res = await model.productos.find({_id:id});
            this.disconnect();
            return res;
        }catch(err){
            throw new Error(err);
        }
    }
    //Agregar un producto
    async addProd(obj){
        try{
            this.connect();
            await model.productos(obj).save();
            this.disconnect();
            return obj;
        }catch(err){
            throw new Error(err);
        }
    }
    //Modificar producto
    async updateProd(id, obj){
        try{
            this.connect();
            let res = await model.productos.updateOne({_id:id},obj);
            this.disconnect();
            return res
        }catch(err){
            throw new Error(err);
        }
    }
    //Borrar un producto por ID
    async deleteById(id){
        try{
            this.connect();
            let res = await model.productos.deleteOne({_id:id});
            this.disconnect();
            return res;
        }catch(err){
            throw new Error(err);
        }
    }
}
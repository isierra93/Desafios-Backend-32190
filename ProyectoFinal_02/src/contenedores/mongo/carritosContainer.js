import MongoContainer from "../MongoContainer";
import * as model from "../../models/carritos.js"

export class Carritos extends MongoContainer{
    constructor(){
        super();
    }
    //Trae todos los carritos
    async getAll(){
        try{
            this.connect();
            let res = await model.carritos.find();
            this.disconnect();
            return res;
        }catch(err){
            throw new Error(err);
        }
    }
    //Trae un carrito por su ID
    async getById(id){
        try{
            this.connect();
            let res = await model.carritos.find({_id:id});
            this.disconnect();
            return res;
        }catch(err){
            throw new Error (err);
        }
    }
    //Agregar un carrito
    async addCart(obj){
        try{
            this.connect();
            let res = await model.carritos({productos:[obj]}).save();
            this.disconnect();
            return {carrito:res, productos:obj};
        }catch(err){
            throw new Error (err);
        }
    }
    //Modificar carrito
    async updateCart(id, obj){
        try{
            this.connect();
            let res = await model.carritos.updateOne({_id:id},obj);
            this.disconnect();
            return res;
        }catch(err){
            throw new Error (err);
        }
    }
    //Borrar un carrito por ID
    async deleteById(id){
        try{
            this.connect();
            let res = await model.carritos.deleteOne({_id:id});
            this.disconnect();
            return res;
        }catch(err){
            throw new Error (err);
        }
    }
}
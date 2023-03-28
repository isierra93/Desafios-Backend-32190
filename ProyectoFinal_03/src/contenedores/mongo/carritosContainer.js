import MongoContainer from "../MongoContainer.js";
import * as model from "../../models/carritos.js";

export class Carritos extends MongoContainer{
    constructor(){
        super();
    }
    //Trae todos los carritos
    async getAll(){
        try{
            await this.connect();
            let res = await model.carritos.find();
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            this.disconnect();
        };
    };
    //Trae un carrito por su ID
    async getById(id){
        try{
            await this.connect();
            let res = await model.carritos.find({_id:id});
            return res;
        }catch(err){
            throw new Error (err);
        }finally{
            this.disconnect();
        };
    };
    //Agregar un carrito
    async addCart(obj){
        try{
            await this.connect();
            let res = await model.carritos({productos:[obj]}).save();
            return {carrito:res, productos:obj};
        }catch(err){
            throw new Error (err);
        }finally{
            this.disconnect();
        };
    };
    //Modificar carrito
    async updateCart(id, obj){
        try{
            await this.connect();
            let res = await model.carritos.updateOne({_id:id},obj);
            return res;
        }catch(err){
            throw new Error (err);
        }finally{
            this.disconnect();
        };
    };
    //Borrar un carrito por ID
    async deleteById(id){
        try{
            await this.connect();
            let res = await model.carritos.deleteOne({_id:id});
            return res;
        }catch(err){
            throw new Error (err);
        }finally{
            this.disconnect();
        };
    };
};
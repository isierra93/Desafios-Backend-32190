import express from "express";
import { Productos } from "../../contenedores/firebase/productosContainer.js";

export class FirebaseProdRouter extends express.Router{
    constructor(){
        super();
        const productos = new Productos();

        this.get(`/`, async (req, res, next) =>{
            try{
                res.json(await productos.getAll());
            }catch(err){
                throw new Error (err);
            };
        });
        this.get(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                res.json(await productos.getById(id))
            }catch(err){
                throw new Error (err);
            }
        });
        this.post(`/`, async (req, res, next) =>{
            try{
                const  obj  = req.body;
                obj.timestamp = new Date().toLocaleString();
                res.json(await productos.addProd(obj));
            }catch(err){
                throw new Error (err);
            };
        });


        this.delete(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                res.json(await productos.deleteById(id));
            }catch(err){
                throw new Error (err);
            }
        });
    };
};

export default FirebaseProdRouter;
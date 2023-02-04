import express from "express";
import { Carritos } from "../../contenedores/firebase/carritosContainer.js";

export class FirebaseCartRouter extends express.Router{
    constructor(){
        super();
        const carritos = new Carritos();

        this.get(`/`, async (req, res, next) =>{
            try{
                res.json(await carritos.getAll());
            }catch(err){
                throw new Error (err);
            };
        });
        this.get(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                res.json(await carritos.getById(id));
            }catch(err){
                throw new Error (err);
            };
        });
        this.post(`/`, async (req, res, next) =>{
            try{
                const obj = req.body;
                res.json(await carritos.addProd({productos:obj,timestamp:new Date().toLocaleString()}));
            }catch(err){
                throw new Error (err);
            };
        });
        this.put(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                const obj = req.body;
                const data = await carritos.getById(id);
                let productos = [...data.productos,...obj]
                data.productos = productos;
                res.json(await carritos.updateProd(id, data));
            }catch(err){
                throw new Error (err);
            };
        });
        this.delete(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                res.json(await carritos.deleteById(id));
            }catch(err){
                throw new Error (err);
            };
        });
    };
};

export default FirebaseCartRouter;
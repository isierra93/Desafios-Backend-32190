import express from "express";
import { Carritos } from "../../contenedores/mongo/carritosContainer.js";

export class MongoCartRouter extends express.Router{
    constructor(){
        super();

        const carritos = new Carritos;

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
                const objs = req.body;
                res.json(await carritos.addCart(objs));
            }catch(err){
                throw new Error (err);
            };
        });
        this.put(`/:id`, async (req, res, next) =>{
            try{
                const { id } = req.params;
                const { objs } = req.body;
                res.json(await carritos.updateCart(id, objs));
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

export default MongoCartRouter;
import express from "express";

export class APIRandomRouter extends express.Router{
    constructor(){
        super()

        this.get('/', async (req, res, next) =>{
            res.json({msg: 'ok'})
        })
    }
};

export default APIRandomRouter;
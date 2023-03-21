import express from "express";
import { fork } from "child_process";

export class APIRandomRouter extends express.Router{
    constructor(){
        super()

        this.get('/', async (req, res, next) =>{
            const calculo = fork('./src/fork/fork.js')
            calculo.on('message', result =>{
                if(result == 'OK'){
                    calculo.send('START')
                    return
                }
                res.json({result})
            })
        })
    }
};

export default APIRandomRouter;
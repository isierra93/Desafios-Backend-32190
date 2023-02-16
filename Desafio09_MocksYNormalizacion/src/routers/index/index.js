import express from "express";

export class Index extends express.Router{
    constructor(){
        super();

        this.get(`/`, async (req, res, next) =>{
            try{
                res.render(`index`);
            }catch(err){
                throw new Error(err);
            };
        });
    };
};

export default Index;
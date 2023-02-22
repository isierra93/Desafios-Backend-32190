import express from "express";

export class Register extends express.Router{
    constructor(){
        super();

        this.get(`/`, async (req, res, next) =>{
            try{
                res.render(`signup`);
            }catch(err){
                throw new Error (err);
            };
        });
    };
};

export default Register;
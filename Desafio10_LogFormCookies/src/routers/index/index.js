import express from "express";

export class Index extends express.Router{
    constructor(){
        super();

        this.get(`/`, async (req, res, next) =>{
            try{
                if(req.session.nameSession){
                    req.session.cookie.maxAge = 60000;
                    return res.render(`index`,{name: req.session.nameSession } );
                }
                res.redirect(`/login`);
            }catch(err){
                throw new Error(err);
            };
        });
    };
};

export default Index;
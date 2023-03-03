import express from "express";
import passport from "passport";

export class Routers extends express.Router{
    constructor(){
        super();
        //Index
        this.get(`/`, async (req, res, next) =>{
            try{
                const { username } = req.body;
                
                res.render(`index`)
            }catch(err){
                throw new Error(err);
            };
        });
        //Login
        this.get(`/login`,passport.authenticate(`login`, {failureRedirect:`/login`, successRedirect:`/index`}), async (req, res, next) => {
            try {
                res.render(`login`);
            } catch (err) {
                throw new Error(err);
            };
        });
        this.post(`/login`, async (req, res, next) => {
            try {
                const { username } = req.body;
                req.session.username = username
                res.redirect(`/`)
            } catch (err) {
                throw new Error(err);
            };
        });
        //Logout
        this.get(`/logout`, async (req, res, next) => {
            try {
                const name = req.session.username;
                req.session.destroy(err => {
                    if (err) {
                        return res.json({ status: `Logout ERROR`, body: err });
                    };
                    res.render(`logout`, { name: name,script: `redirect` });
                });
            } catch (err) {
                throw new Error(err);
            };
        });
        //Signup------------
        this.get(`/signup`, async (req, res, next) =>{
            try{
                res.render(`signup`);
            }catch(err){
                throw new Error (err);
            };
        });

    };
};

export default Routers;
import express from "express";

export class Login extends express.Router {
    constructor() {
        super();

        this.get(`/`, async (req, res, next) => {
            try {
                res.render(`login`);
            } catch (err) {
                throw new Error(err);
            };
        });
        this.post(`/`, async (req, res, next) => {
            try {
                const { nameSession } = req.body;
                req.session.nameSession = nameSession
                res.redirect(`/`)
            } catch (err) {
                throw new Error(err);
            };
        });
    };
};

export default Login;
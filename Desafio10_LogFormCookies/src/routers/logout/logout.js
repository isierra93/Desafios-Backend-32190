import express from "express";

export class Logout extends express.Router {
    constructor() {
        super();

        this.get(`/`, async (req, res, next) => {
            try {
                const name = req.session.nameSession;
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
    };
};

export default Logout;
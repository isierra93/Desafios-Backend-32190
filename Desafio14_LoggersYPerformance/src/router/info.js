import express from "express";
import returnInfo from "../utils/info.js";
import compression from "compression";

export class InfoRouter extends express.Router {
  constructor() {
    super();

    this.get("/",compression(), async (req, res, next) => {
      try {
        res.json(await returnInfo());
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}

export default InfoRouter;

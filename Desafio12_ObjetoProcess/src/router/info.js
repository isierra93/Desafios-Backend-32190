import express from "express";
import returnInfo from "../utils/info.js";

export class InfoRouter extends express.Router {
  constructor() {
    super();

    this.get("/", async (req, res, next) => {
      try {
        res.json(await returnInfo());
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}

export default InfoRouter;

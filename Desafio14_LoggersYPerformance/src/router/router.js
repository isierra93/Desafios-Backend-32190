import express from "express";
import passport from "passport";
import { checkAuthentication, getLogOut } from "../utils/auth.js";
import * as logger from "../logger/logger.js";

export const rutas = ['/login']

export class Routers extends express.Router {
  constructor() {
    super();
    this.get("/",logURLnMethod, checkAuthentication, async (req, res, next) => {
      try {
        res.render("index", { script: "main", name: req.user.username });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/login",logURLnMethod, async (req, res, next) => {
      try {
        res.render("login");
      } catch (error) {
        throw new Error(error);
      }
    });

    this.post(
      "/login",
      logURLnMethod,
      passport.authenticate("login", {
        failureRedirect: `/failsignin`,
        successRedirect: `/`,
      })
    );

    this.get("/failsignin",logURLnMethod, async (req, res, next) => {
      try {
        res.render("failsignin", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/logout",logURLnMethod, getLogOut, async (req, res, next) => {
      try {
        res.render("logout", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/signup",logURLnMethod, async (req, res, next) => {
      try {
        res.render("signup");
      } catch (error) {
        throw new Error(error);
      }
    });

    this.post(
      "/signup",
      logURLnMethod,
      passport.authenticate("signup", {
        failureRedirect: `/failsignup`,
        successRedirect: `/login`,
      })
    );

    this.get("/failsignup", logURLnMethod, async (req, res, next) => {
      try {
        res.render("failsignup", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("*", async (req, res) => {
      const { originalUrl, method } = req;
      logger.logConsola.warn(`Ruta ${originalUrl} - ${method} no implementado. .`)
      logger.logWarning.warn(`Ruta ${originalUrl} - ${method} no implementado. .`)
      res.redirect(`/`);
    });
  }
}

function logURLnMethod(req,res,next) {
  const { url, method } = req;
  logger.logConsola.info(`Ruta ${url} - ${method}.`)
  return next()
}

export default Routers;

import express from "express";
import passport from "passport";
import { checkAuthentication, getLogOut } from "../utils/auth.js";

export class Routers extends express.Router {
  constructor() {
    super();
    this.get("/", checkAuthentication, async (req, res, next) => {
      try {
        res.render("index", { script: "main", name: req.user.username });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/login", async (req, res, next) => {
      try {
        res.render("login");
      } catch (error) {
        throw new Error(error);
      }
    });

    this.post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: `/failsignin`,
        successRedirect: `/`,
      })
    );

    this.get("/failsignin", async (req, res, next) => {
      try {
        res.render("failsignin", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/logout", getLogOut, async (req, res, next) => {
      try {
        res.render("logout", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("/signup", async (req, res, next) => {
      try {
        res.render("signup");
      } catch (error) {
        throw new Error(error);
      }
    });

    this.post(
      "/signup",
      passport.authenticate("signup", {
        failureRedirect: `/failsignup`,
        successRedirect: `/login`,
      })
    );

    this.get("/failsignup", async (req, res, next) => {
      try {
        res.render("failsignup", { script: "redirect" });
      } catch (error) {
        throw new Error(error);
      }
    });

    this.get("*", async (req, res) => {
      const { originalUrl, method } = req;
      console.log(`Ruta ${method} - ${originalUrl} no implementada.`);
      res.redirect(`/`);
    });
  }
}

export default Routers;

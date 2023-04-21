import { Router } from "express";
import passport from "../Router/Passport/passport.js"
import Controller from "../Controller/controller.js";

const APIRouter = Router();

//Inicio
APIRouter.get("/", Controller.checkAuthentication, Controller.getIndex);
//Login
APIRouter.get("/login", Controller.getLogin);
APIRouter.post("/login", passport.authenticate("login", {
    failureRedirect: "/failLogin",
    successRedirect: "/",
}));
APIRouter.get("/failLogin", Controller.getFailLogin);
//Logout
APIRouter.get("/logout", Controller.checkAuthentication, Controller.getLogout)
//Sigin
APIRouter.get("/signin", Controller.getSignin);
APIRouter.post("/signin", Controller.uploadAvatar, passport.authenticate("signin", { 
    failureRedirect: "/failSignin", 
    successRedirect: "/"
}));
APIRouter.get("/failSignin", Controller.getFailSignin);
//Perfil
APIRouter.get("/perfil", Controller.getPerfil);
//Products
APIRouter.get("/productos/:filtros?", Controller.checkAuthentication, Controller.getProductos);
APIRouter.post("/productos", Controller.postProductos, Controller.postProductos);
//Cart
APIRouter.get("/carrito", Controller.checkAuthentication, Controller.getCarrito);
APIRouter.get("/addCarritoProd/:email/:prodId", Controller.checkAuthentication, Controller.getAddCarritoProd);
APIRouter.get("/deleteCarritoProd/:email/:prodId", Controller.checkAuthentication, Controller.getDeleteCarritoProd);
APIRouter.get("/pedidoCarrito/:email/:productosId", Controller.checkAuthentication, Controller.getPedidoCarrito);

export default APIRouter;
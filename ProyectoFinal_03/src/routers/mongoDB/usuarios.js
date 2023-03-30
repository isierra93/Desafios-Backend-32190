import express from "express";
import { Usuarios } from "../../contenedores/mongo/usuariosContainer.js";

export class MongoUserRouter extends express.Router {
  constructor() {
    super();

    const usuarios = new Usuarios();

    this.get(`/`, async (req, res, next) => {
      try {
        res.json(await usuarios.getAll());
      } catch (err) {
        throw new Error(err);
      }
    });
    this.get(`/:id`, async (req, res, next) => {
      try {
        const { id } = req.params;
        res.json(await usuarios.getById(id));
      } catch (err) {
        throw new Error(err);
      }
    });
    this.post(`/`, async (req, res, next) => {
      try {
        const obj = req.body;
        res.json(await usuarios.addProd(obj));
      } catch (err) {
        throw new Error(err);
      }
    });
    this.put(`/:id`, async (req, res, next) => {
      try {
        const { id } = req.params;
        const obj = req.body;
        res.json(await usuarios.updateProd(id, obj));
      } catch (err) {
        throw new Error(err);
      }
    });
    this.delete(`/:id`, async (req, res, next) => {
      try {
        const { id } = req.params;
        res.json(await usuarios.deleteById(id));
      } catch (err) {
        throw new Error(err);
      }
    });
  };
};

export default MongoUserRouter;

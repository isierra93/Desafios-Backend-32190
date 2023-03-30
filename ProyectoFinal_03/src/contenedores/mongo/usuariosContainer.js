import MongoContainer from "../MongoContainer.js";
import * as model from "../../models/usuarios.js";

export class Usuarios extends MongoContainer {
  constructor() {
    super();
  }
  //Trae todos los usuarios
  async getAll() {
    try {
      await this.connect();
      let res = await model.usuarios.find();
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.disconnect();
    };
  };
  //Trae usuario por ID
  async getById(id) {
    try {
      await this.connect();
      let res = await model.usuarios.find({ _id: id });
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.disconnect();
    };
  };
  //Agregar un usuario
  async addProd(obj) {
    try {
      await this.connect();
      await model.usuarios(obj).save();
      return obj;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.disconnect();
    };
  };
  //Modificar usuario
  async updateProd(id, obj) {
    try {
      await this.connect();
      let res = await model.usuarios.updateOne({ _id: id }, obj);
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.disconnect();
    };
  };
  //Borrar un usuario por ID
  async deleteById(id) {
    try {
      await this.connect();
      let res = await model.usuarios.deleteOne({ _id: id });
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.disconnect();
    };
  };
};

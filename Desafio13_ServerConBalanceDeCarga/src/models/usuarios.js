import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
    username:{type:String, require:true},
    password:{type:String, require:true}
});

export const usuarios = mongoose.model(usuariosCollection, usuariosSchema);
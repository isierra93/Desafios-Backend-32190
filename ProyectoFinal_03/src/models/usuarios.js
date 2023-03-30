import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
    email:{type:String, require:true},
    password:{type:String, require:true},
    name:{type:String, require:true},
    adress:{type:String, require:true},
    age:{type:Number, require:true},
    phone:{type:Number, require:true},
    thumbnail:{type:String, require:true}
});

export const usuarios = mongoose.model(usuariosCollection, usuariosSchema);
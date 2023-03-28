import mongoose from "mongoose";

const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    name:{type: String, require:true},
    price:{type: Number, require:true},
    description:{type: String, require:true},
    stock:{type: Number, require:true},
    thumbnail:{type: String, require:true},
    timestamp:{type: Date, default: Date.now, require:true},
    code:{type: Number, require:true}
});

export const productos = mongoose.model(productosCollection, productosSchema);
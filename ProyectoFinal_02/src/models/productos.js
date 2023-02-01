import mongoose from "mongoose";

const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    name:{type: String, require:true, max: 50},
    price:{type: Number, require:true, max:10},
    description:{type: String, require:true, max: 200},
    stock:{type: Number, require:true, max:10},
    thumbnail:{type: String, require:true, max:500},
    timestamp:{type: Date, default: Date.now, require:true},
    code:{type: Number, require:true, max:500}
});

export const productos = mongoose.model(productosCollection, productosSchema);

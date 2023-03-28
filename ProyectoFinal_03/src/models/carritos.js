import mongoose from "mongoose";

const carritosCollection = "carritos";

const carritosSchema = new mongoose.Schema({
    timestamp:{type: Date, default: Date.now, require:true},
    productos:{type: Array, require:true}
});

export const carritos = mongoose.model(carritosCollection, carritosSchema);
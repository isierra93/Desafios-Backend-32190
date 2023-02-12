import express from "express";
import generarProductos from "../../utils/faker.js";

export class ProductosTest extends express.Router{
    constructor(){
        super();

        this.get(`/`, async (req, res, next) =>{
            try{
                res.render(`faker`,{productos: await generarProductos(5)});
            }catch(err){
                throw new Error (err);
            };
        });
    };
};

export default ProductosTest;
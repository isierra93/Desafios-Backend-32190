//Iniciando Express
import express from "express"
import Router  from "express";
const app = express()

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const routerProductos = Router();
const routerCarrito = Router();
app.use(`/api/productos`, routerProductos);
app.use(`/api/carrito`, routerCarrito);

//Import de clase Contenedor
import Contenedor from "./Contenedor.js";
const productos = new Contenedor(`Productos`, `json`);
const carritos = new Contenedor(`Carritos`, `json`);

//Variable para Administradores
const adm = true;

//Rutas de productos
routerProductos.get(`/`, async (req, res) =>{
    const prods = await productos.getAll();
    if(prods){
        res.json(prods);
        return;
    }
    res.json({error: `No se encontraron productos.`});
})

routerProductos.get(`/:id`, async (req, res) => {
    const { id } = req.params;
    const prod = await productos.getById(id);
    if(prod){
        res.json(prod);
        return;
    }
    res.json({error: `No se encontro producto con ese ID.`});
});

routerProductos.post(`/`, async (req, res) => {
    const prod = req.body;
    prod.timestamp = new Date();
    await productos.save(prod);
    res.json(`ok`);
});

routerProductos.put(`/:id`, async (req, res) =>{
    const { id } = req.params;
    const newProd = req.body;
    newProd.id = id;
    await productos.replaceById(id, newProd);
    res.json(`OK`);
});

routerProductos.delete(`/:id`, async (req, res) =>{
    const { id } = req.params;
    await productos.deleteById(id);
    res.json(`OK`);
});

//Rutas de carritos
routerCarrito.get(`/`, async (req, res) =>{
    const karts = await carritos.getAll();
    if(karts){
        res.json(karts);
    }
    res.json({error: `No se encontraron carritos.`})
});

routerCarrito.post(`/`, async (req, res) =>{
    const kart = req.body;
    kart.timestamp = new Date();
    await carritos.save(kart)
    res.json(`OK`);
})

//Levanta el servidor con handle de error
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));
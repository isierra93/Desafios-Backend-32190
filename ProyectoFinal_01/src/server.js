//Iniciando Express
import express from "express"
import Router  from "express";
const app = express()
import { middleware } from "./middleware/authMiddleware.js";

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const routerProductos = Router();
const routerCarrito = Router();
app.use(middleware)
app.use(`/api/productos`, routerProductos);
app.use(`/api/carrito`, routerCarrito);

//Import de clase Contenedor
import Contenedor from "./Contenedor.js";
const productos = new Contenedor(`Productos`, `json`);
const carritos = new Contenedor(`Carritos`, `json`);

//Rutas de productos
routerProductos.get(`/`, async (req, res) =>{
    const prods = await productos.getAll();
    if(prods){
        return res.json(prods);
    }
    res.json({error: `No se encontraron productos.`});
})

routerProductos.get(`/:id`, async (req, res) => {
    const { id } = req.params;
    const prod = await productos.getById(id);
    if(prod){
        return res.json(prod);
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
routerCarrito.post(`/`, async (req, res) =>{
    const kart = {
        productos: req.body,
        timestamp: new Date()
    }
    const id = await carritos.save(kart);
    res.json({
        carritoID:id
    });
});

routerCarrito.delete(`/:id`, async (req, res) =>{
    const { id } = req.params;
    await carritos.deleteById(id);
    res.json({
        carritoEliminado: id
    });
});

routerCarrito.get(`/:id/productos`, async (req, res) =>{
    const { id } = req.params;
    const kart = await carritos.getById(id);
    if(kart){
        return res.json(kart.productos);
    }
    res.json({error: `No se encontro carrito con ID: ${id}.`});
});

routerCarrito.post(`/:id/productos`, async (req, res) =>{
    const { id } = req.params;
    const {idProd} = req.body;
    const kart = await carritos.getById(id);
    const prod = await productos.getById(idProd);
    if(kart == null || prod == null){
        return res.json({
            error: `No se encontro producto/carrito con ID ${id} o ${idProd}.`
        });
    }
    kart.productos.push(prod);
    await carritos.replaceById(id, kart);
    res.json({OK: `Producto agregado al carrito.`})
});

routerCarrito.delete(`/:id/productos/:id_prod`, async (req, res) =>{
    const { id , id_prod } = req.params;
    const carrito = await carritos.getAll()
    const newKart = await carritos.removeByIds(id, id_prod,carrito);
    await carritos.saveArray(newKart)
    res.json({id:id, idprod:id_prod,Carritos:newKart})
});

//Levanta el servidor con handle de error
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));
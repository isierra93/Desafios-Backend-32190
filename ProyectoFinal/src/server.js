//Imports
const express = require(`express`);
const app = express();
//Routes
const routerProductos = require(`./routes/routes`);
app.use(`/api/productos`, routerProductos);
const routerCarrito = require(`./routes/routes`);
app.use(`/api/carrito`, routerCarrito);

const Contenedor = require(`./Contenedor`);
const productos = new Contenedor(`Productos`, `json`);
const carritos = new Contenedor(`Carritos`, `json`);

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
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
})

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

//Levanta el servidor con handle de error
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));
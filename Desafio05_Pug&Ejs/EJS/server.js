//Imports
const express = require(`express`);
const app = express();
const Contenedor = require(`../Contenedor`);
const tienda = new Contenedor(`Productos`,`json`);

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configuracion EJS
app.set(`view engine`, `ejs`);

//Se define ruta de archivos estaticos, se accedera bajo el prefijo virtual /static/:archivo
app.use(`/static`, express.static(`public`));

//Sever ON con handle de error de inicio
const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

server.on(`error`, err => console.log(`Error en servidor: ${err}`));

//Muestra el form para cargar productos
app.get(`/`, async (req, res) =>{
    res.render(`pages/indexForm`);
});

//Muestra el listado de productos cargados
app.get(`/productos`, async (req, res) =>{
    const productos = await tienda.getAll();
    res.render(`pages/indexTable`, {productos});
});

//Recibe el post del form y guarda el producto
app.post(`/productos`, async (req, res) =>{
    const newProd = req.body;
    tienda.save(newProd);
    res.redirect(`/`);
});
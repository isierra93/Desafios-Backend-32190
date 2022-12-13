//Se importa express y se declaran variables
const express = require(`express`);
const app = express();

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Se importa Router y aplica ruta
const { Router } = express;
const router = Router();
app.use(`/api/productos`, router);

//Se define ruta de archivos estaticos, se accedera bajo el prefijo virtual /static/:archivo
app.use(`/static`, express.static(`public`))

//Import de la tienda declarada en el Contenedor
const tienda = require(`./Contenedor`)

//Sever ON con handle de error de inicio
const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));

//Rutas
//Este midleware no hace nada es para pruebas
function miMidleware(req, res, next){
    console.log(`Ingresando en el server`)
    next()
}

//Devuelve todos los productos almacenados en el archivo.
router.get(`/`, async (req, res) =>{
    const productos = await tienda.getAll();
    res.json(productos);
});

//Devuelve un producto por su ID, en caso de no existir devuelve un objeto Error
router.get(`/:id`, async (req, res) =>{
    const {id} = req.params;
    const producto = await tienda.getById(id);
    if(producto === null){
        res.json({error:`Producto no encontrado.`})
    }else{
        res.json(producto)
    };
});

//Recibe y agrega un producto, lo devuelve con su ID asignado
router.post(`/`, async (req, res) =>{
    const producto = req.body;
    const prod = await tienda.save(producto)
    res.json(prod)
});

//Recibe y actualiza un producto, segun su ID
router.put(`/:id`, async (req, res) =>{
    const {id} = req.params;
    const prod = req.body;
    prod.id = Number(id);
    let error = true;
    const productos = await tienda.getAll();
    productos.map(elem =>{
        if(elem.id == id){
            error = false;
            productos[Number(id)-1] = prod;
            res.json(productos);
        };
    });
    if(error){
        res.json({error:`Producto no encontrado.`});
    };
    await tienda.saveArray(productos);
});

//Elimina u producto segun su ID
router.delete(`/:id`, async (req, res) =>{
    const {id} = req.params;
    const productos = await tienda.getAll()
    const productos2 = []
    productos.map(elem =>{
        if(elem.id != id){
            productos2.push(elem)
        }
    });
    await tienda.saveArray(productos2)
});
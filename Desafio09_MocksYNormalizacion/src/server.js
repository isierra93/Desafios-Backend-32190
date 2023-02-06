import express from "express"
import handlebars from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import ProductosTest from "./routers/productosTest/productosTest.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//---------------------------------------------------//
//Importar contenedor
import ContenedorJSON from "./contenedores/ContenedorJSON.js";
//Declarar contenedores
const productosContainer = new ContenedorJSON(`Productos`,`json`);
const mensajesContainer = new ContenedorJSON(`Mensajes`, `json`);
//---------------------------------------------------//

//Se define ruta de archivos estaticos, se accedera bajo el prefijo virtual /static/:archivo
app.use(express.static(`./public`));

//Configuracion Handlebars
app.engine(`handlebars`, handlebars.engine());
app.set(`views`, `./views`);
app.set(`view engine`, `handlebars`);

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Socket - "connection" se ejecuta la primera vez que se abre una nueva conexion
io.on(`connection`, async (socket) =>{
    console.log(`Un usuario se ha conectado`);
    //Envia los productos almacenados
    const productos = await productosContainer.getAll();
    socket.emit(`productos`, productos);
    //Escucha los nuevos productos, los guarda y envia a los sockets conectados
    socket.on(`new-prod`, async (prod) =>{
        await productosContainer.save(prod);
        const productos = await productosContainer.getAll()
        io.sockets.emit(`productos`, productos)
    });
    //Envia los mensajes almacenados
    const mensajes = await mensajesContainer.getAll();
    socket.emit(`mensajes`, mensajes);
    //Escucha los nuevos mensajes, los guarda y los envia a los sockets conectados
    socket.on(`new-msg`, async (msg) =>{
        await mensajesContainer.save(msg);
        const mensajes = await mensajesContainer.getAll();
        io.sockets.emit(`mensajes`, mensajes);
    });
});

//Sever ON con handle de error de inicio
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

app.get(`/`, async (req, res) => {
    res.render(`index`);
});

app.use(`/api/productos-test`, new ProductosTest());
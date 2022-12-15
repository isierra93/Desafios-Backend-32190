const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const path =  require('path');

const ContenedorChat = require('./managers/ContenedorChat')

//DB
const { mariaDBOptions } = require(`./options/mariaDB`);
const ClienteSQL = require(`../src/managers/ContenedorKnex`);
const mariaDB = new ClienteSQL(mariaDBOptions, `productos`);

let chatContainer = new ContenedorChat('chat.txt');

const viewsFolder = path.join(__dirname,"views");

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>    {
    console.log(`Server Port ${PORT}`);
    mariaDB.checkTable()
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());

app.set("views", viewsFolder);

app.set("view engine", "handlebars");

//Websocket

//Config websocket
const io = new Server(server);

//Detectar cada socket de un cliente que se conecte
io.on("connection", async(socket)=>{
    console.log("Nuevo cliente conectado");
    //Chat
    const chat = await chatContainer.getAll();
    socket.emit("messagesChat", chat);

    //Products
    const productosDB = await mariaDB.getAll()
    socket.emit("products", productosDB);
    
    //Recibir msg
    socket.on("newMsg", async(data)=>{
        await chatContainer.save(data)
        //enviar los mensajes a todos los socket conecta2
        const chat = await chatContainer.getAll();
        io.sockets.emit("messagesChat", chat)
    })

    //Recibir Producto
    socket.on("newProduct", async(data)=>{
        await mariaDB.save(data)
        //Enviar productos actualizados
        const productosDB = await mariaDB.getAll();
        io.sockets.emit("products", productosDB)
    })
})

app.get('/', (req,res) => {
    res.render("home")
});
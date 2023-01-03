const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const path =  require('path');

//DB
const { mariaDBOptions } = require(`./options/mariaDB`);
const { optionsSql3 } = require(`./options/sqlite3DB`);
const ClienteSQL = require(`../src/managers/ContenedorKnex`);
//Los productos se guardan con MariaDB
const mariaDB = new ClienteSQL(mariaDBOptions, `productos`);
//Los mesajes se guardian con Sqlite3
const sqlite = new ClienteSQL(optionsSql3, `mensajes`)

const viewsFolder = path.join(__dirname,"views");

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>    {
    console.log(`Server Port ${PORT}`);
    mariaDB.checkTableProd()
    sqlite.checkTableMsg()
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
    const mensajes = await sqlite.getAll()
    socket.emit("messagesChat", mensajes);

    //Products
    const productosDB = await mariaDB.getAll()
    socket.emit("products", productosDB);
    
    //Recibir Chat
    socket.on("newMsg", async(data)=>{
        await sqlite.save(data);
        //enviar los mensajes a todos los socket conectados
        const mensajes = await sqlite.getAll();
        io.sockets.emit("messagesChat", mensajes);
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
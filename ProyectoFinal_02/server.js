import express from "express";
import MongoProdRouter from "./src/routers/mongoDB/productos.js";
import MongoCartRouter from "./src/routers/mongoDB/carritos.js";

const app = express();

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mongodb/carritos", new MongoCartRouter());
app.use("/mongodb/productos", new MongoProdRouter());

//Levanta el servidor con handle de error
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));
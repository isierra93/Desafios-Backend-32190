import express from "express";
import MongoProdRouter from "./src/routers/mongoDB/productos.js";
import MongoCartRouter from "./src/routers/mongoDB/carritos.js";
import MongoUserRouter from "./src/routers/mongoDB/usuarios.js"
import FirebaseProdRouter from "./src/routers/firebase/productos.js"
import FirebaseCartRouter from "./src/routers/firebase/carritos.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mongodb/productos", new MongoProdRouter());
app.use("/mongodb/carritos", new MongoCartRouter());
app.use("/mongodb/usuarios", new MongoUserRouter());
app.use("/firebase/productos", new FirebaseProdRouter());
app.use(`/firebase/carritos`, new FirebaseCartRouter());

//Levanta el servidor con handle de error
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on(`error`, err => console.log(`Error en servidor: ${err}`));
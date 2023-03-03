import express from "express";
import handlebars from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import Routers from "./src/router/router.js";
import { normalize } from "normalizr";
import messagesSchema from "./src/utils/normalizr.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoAtlas from "./src/config/mongoAtlasConnect.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//---------------------------------------------------//
//Importar contenedor
import {
  productosContainer,
  mensajesContainer,
  usuariosContainer,
} from "./src/contenedores/ContenedorJSON.js";
//---------------------------------------------------//

//Se define ruta de archivos estaticos
app.use(express.static("./src/public"));

//Configuracion Handlebars
app.engine(`handlebars`, handlebars.engine());
app.set(`views`, `./src/views`);
app.set(`view engine`, `handlebars`);

//Para que el servidor pueda interpretar automaticamente objetos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookies y Sessions con persistencia en MongoAtlas
app.use(cookieParser());
app.use(session(mongoAtlas));

import passport from "passport";
import { checkAuthentication, getLogOut } from "./src/utils/auth.js";
import { Strategy as LocalStrategy } from "passport-local";

//Passport Strategy
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const usuarios = await usuariosContainer.getAll();
      const user = usuarios.find((user) => user.username == username) || null;
      console.log("Usuario: " + username + " Contraseña: " + password);
      if (!user) {
        console.log("NOT USER FOUND");
        return done(null, false, { message: "Not User Found" });
      }
      if (user.password == password) {
        console.log(user);
        return done(null, user);
      }
      console.log("NOT PW MATCH");
      return done(null, false, { message: "Incorrect password" });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const usuarios = await usuariosContainer.getAll();
      const user = usuarios.find((user) => user.username == username) || null;
      console.log("Usuario: " + username + " Contraseña: " + password);
      if (!user) {
        const newUser = { username: username, password: password };
        return done(null, await usuariosContainer.save(newUser));
      }
      if (user) {
        console.log("USER REGISTRADO");
        return done(null, false, {message: "Usuario ya registrado"});
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usuariosContainer.getById(id);
  done(null, user);
});

//Rutas
app.get("/", checkAuthentication, async (req, res, next) => {
  try {
    res.render("index", { script: "main", name: req.user.username });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/login", async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    throw new Error(error);
  }
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: `/failsignin`,
    successRedirect: `/`,
  })
);

app.get("/failsignin", async (req, res, next) => {
  try {
    res.render("failsignin" , {script: "redirect"});
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/logout", getLogOut, async (req, res, next) => {
  try {
    res.render("logout", { script: "redirect" });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/signup", async (req, res, next) => {
  try {
    res.render("signup");
  } catch (error) {
    throw new Error(error);
  }
});

app.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: `/failsignup`,
    successRedirect: `/login`,
  })
);

app.get("/failsignup", async (req, res, next) =>{
  try {
    res.render("failsignup", {script: "redirect"});
  } catch (error) {
    throw new Error (error);
  }
})

app.get("*", async (req, res) =>{
  const { originalUrl, method } = req;
  console.log(`Ruta ${method} ${originalUrl} no implementada.`);
  res.redirect(`/`);
})

//Socket - "connection" se ejecuta la primera vez que se abre una nueva conexion
io.on(`connection`, async (socket) => {
  console.log(`Un usuario se ha conectado`);
  //Envia los productos almacenados
  const productos = await productosContainer.getAll();
  socket.emit(`productos`, productos);
  //Escucha los nuevos productos, los guarda y envia a los sockets conectados
  socket.on(`new-prod`, async (prod) => {
    await productosContainer.save(prod);
    const productos = await productosContainer.getAll();
    io.sockets.emit(`productos`, productos);
  });

  //Normaliza los mensajes almacenados y luego los envia
  const mensajesSinNormalizar = await mensajesContainer.getAll();
  const mensajesNormalizados = normalize(
    { id: "coder", mensajes: mensajesSinNormalizar },
    messagesSchema
  );
  const porcentaje = Math.round(
    (JSON.stringify(mensajesNormalizados).length /
      JSON.stringify(mensajesSinNormalizar).length) *
      100
  );
  socket.emit(`mensajes`, mensajesNormalizados, porcentaje);
  //Escucha los nuevos mensajes, los guarda y los envia a los sockets conectados
  socket.on(`new-msg`, async (msg) => {
    await mensajesContainer.save(msg);
    const mensajes = await mensajesContainer.getAll();
    const mensajesNormalizados = normalize(
      { id: "coder", mensajes: mensajes },
      messagesSchema
    );
    io.sockets.emit(`mensajes`, mensajesNormalizados);
  });
});

//Sever ON con handle de error de inicio
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

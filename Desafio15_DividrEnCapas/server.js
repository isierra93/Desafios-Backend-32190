import cluster from "cluster";
import express from "express";
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import compression from "compression";
import { MONGO_OPTIONS } from "./src/config/mongoOptions.js";
import { DOT_ENV } from "./src/Dot_Env_Input.js";
import Controller from "./src/Controller/controller.js";
import * as Logger from "./src/Logger.js";
import * as Passport from "./src/Passport.js";
import APIRouter from "./src/Router/router.js";
import dotenv from "dotenv";
dotenv.config();

if (DOT_ENV.MODE !== "FORK" && DOT_ENV.MODE !== "CLUSTER") {
  Logger.logConsola.info(
    `El modo: "${DOT_ENV.MODE}" es inválido. Opciones: "FORK"(default), "CLUSTER" .`
  );
  process.exit(0);
}
if (DOT_ENV.MODE === "CLUSTER" && cluster.isPrimary) {
  const numCpus = os.cpus().length;

  Logger.logConsola.info("Número de procesadores: " + numCpus);
  Logger.logConsola.info("PID:" + process.pid);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    Logger.logConsola.info(`Worker ${process.pid}: Desconectado`);
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || DOT_ENV.PORT;

  // Server Setup
  const app = express();
  const httpServer = new Server(app);
  const io = new IOServer(httpServer);


  // App Uses
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("./public"));
  app.set("view engine", "ejs");
  app.use(compression());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: MONGO_OPTIONS,
      }),
      secret: "isSecret",
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        path: "/",
        httpOnly: false,
        secure: false,
        maxAge: 600000,
      },
    })
  );
  app.use(passport.session());

// Passport
passport.use("login", Passport.Login);
passport.use("signin", Passport.Signin);
passport.serializeUser(Passport.Serializar);
passport.deserializeUser(Passport.Deserializar);

// App Router
app.use("/", APIRouter);

// Server ON
httpServer.listen(PORT, () => {
  Logger.logConsola.info(`Server iniciado desde el PORT ${PORT} en modo ${DOT_ENV.MODE}`);
});

// Websocket io
io.on("connection", Controller.websocket);

};
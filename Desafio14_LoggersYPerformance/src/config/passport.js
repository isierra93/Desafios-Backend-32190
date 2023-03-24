import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usuariosDB from "../contenedores/mongo/usuariosContainer.js";
import { hashPassword, unHashPassword} from "../utils/bcrypt.js";
import * as logger from "../logger/logger.js";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const usuarios = await usuariosDB.getAll();
      const user = usuarios.find((user) => user.username == username) || null;
      if (!user) {
        logger.logConsola.info(`Este usuario no existe.`);
        return done(null, false, { message: "Not User Found" });
      }
      if (await unHashPassword(password, user.password)) {
        return done(null, user);
      }
      logger.logConsola.info(`Contraseña incorrecta.`)
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
      const usuarios = await usuariosDB.getAll()
      const user = usuarios.find((user) => user.username == username) || null;
      if (!user) {
        const newUser = { username: username, password: await hashPassword(password) };
        return done(null, await usuariosDB.addUser(newUser));
      }
      if (user) {
        logger.logConsola.info(`Este usuario ya se encuentra registrado.`);
        return done(null, false, {message: "Usuario ya registrado"});
      }
    }
  )
);
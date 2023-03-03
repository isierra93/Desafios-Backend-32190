import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {usuariosContainer} from "../contenedores/ContenedorJSON.js"

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
      if (await unHashPassword(password, user.password)) {
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
        const newUser = { username: username, password: await hashPassword(password) };
        return done(null, await usuariosContainer.save(newUser));
      }
      if (user) {
        console.log("USER REGISTRADO");
        return done(null, false, {message: "Usuario ya registrado"});
      }
    }
  )
);
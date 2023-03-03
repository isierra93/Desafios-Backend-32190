import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {usuariosContainer} from "../contenedores/ContenedorJSON.js"

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usuariosContainer.getById(id);
  done(null, user);
});
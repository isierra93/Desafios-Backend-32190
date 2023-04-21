import { Strategy as LocalStrategy } from "passport-local";
import Controller from "../../Controller/controller.js"
import Service from "../Service.js";
import * as Logger from "../../Logger.js";

const Login = new LocalStrategy(
    async (username, password, next) => {
    try {
        Logger.logConsola.info('ingresandoo')
        const user = await Service.getUserByEmail(username);
  
        if(!user){
            return next(null, false);
        };

        if(!Controller.isValidPassword(user, password)){
            return next(null, false);
        };

        return next(null, user);

        } catch (error) {
        Logger.logError.error(error)
        };
});

const Signin =  new LocalStrategy({
  passReqToCallback: true},
        async (req, username, password, next) => {
          try {
            Logger.logConsola.info('Iniciando signin')
          const user = await Service.getUserByEmail(req.body.email);
          
          if(user){
            return next(null, false);
          };

          const { email, apellido, edad , direccion, phone} = req.body;
          const { file } = req;

          if(file){
            const newUser = {
              email:email,
              password: Controller.createHash(password),
              nombre: username,
              apellido,
              edad,
              direccion,
              numero: phone,
              avatar: file.filename
            };

        await Service.saveUser(newUser);

        return next(null, newUser);

        };

        const newUser = {
          email:email,
          password: Controller.createHash(password),
          nombre: username,
          apellido,
          edad,
          direccion,
          numero: phone,
          avatar: "sinFoto.jpg"
        };

        await Service.saveUser(newUser);

        return next(null, newUser);

        } catch (error) {
            Logger.logError.error(error)
        }; 
});


const Serializar = (username, next) => {
  Logger.logConsola.info('Serializar')
    next(null, username.email);
};
  
const Deserializar = async (email, next) => {
    try {
      Logger.logConsola.info('Deserializar')
      const acc = await Service.getUserByEmail(email);
  
      next(null, acc);

    } catch (error) {
      Logger.logError.error(error);
    };
};

export default{
    Login,
    Signin,
    Serializar,
    Deserializar
};
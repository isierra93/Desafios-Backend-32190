import MongoStore from "connect-mongo";
import {DOT_ENV} from "../config/config.js"

const mongoAtlas = {
  store: MongoStore.create({
    mongoUrl:
    DOT_ENV.URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: DOT_ENV.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  },
};

export default mongoAtlas;
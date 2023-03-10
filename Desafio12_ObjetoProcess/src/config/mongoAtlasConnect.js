import MongoStore from "connect-mongo";
import {URL,SECRET} from "./config.js";

const mongoAtlas = {
  store: MongoStore.create({
    mongoUrl:
      URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  },
};

export default mongoAtlas;
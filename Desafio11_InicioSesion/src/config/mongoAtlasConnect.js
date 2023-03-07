import MongoStore from "connect-mongo";
import URL from "./MongoURL.js"

const mongoAtlas = {
  store: MongoStore.create({
    mongoUrl:
      URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: "am423o8hMF87Y1FKhdYH97",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  },
};

export default mongoAtlas;
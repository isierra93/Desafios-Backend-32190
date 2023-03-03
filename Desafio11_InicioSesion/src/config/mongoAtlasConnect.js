import MongoStore from "connect-mongo";

const mongoAtlas = {
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://coderhouse:backend@backend32190.d8t9phz.mongodb.net/logform?retryWrites=true&w=majority",
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
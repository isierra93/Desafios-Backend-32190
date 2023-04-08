import * as Logger from "../Logger.js";
import * as db from "../DBs.js";
import * as Faker from "../Faker.js";
import * as Mailer from "../Nodemailer.js";
import admEmail from "../Nodemailer.js";
import * as Multer from "../Multer.js";

//MULTER

function uploadAvatar (req, res, next){
  Multer.upload.single("avatar")
  next()
}

//SIGIN

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

function getSignin(req, res) {
  res.render("signin");
};

//LOGIN

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  };
  res.render("login");
};

//LOGOUT

function getLogout(req, res) {
  const username = req.user.nombre;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    } else {
      res.render("logout", { usuario: username });
    };
  });
};

//INDEX

function getIndex(req, res) {
  res.render("index", { user: req.user });
}

//PRODUCTS

async function getProductos(req, res) {
  try {
    const tagsFiltrables = Faker.tagsFiltrables.join(" - ");
    const { filtros } = req.params;
    let listExists = false;
    let productos = await db.Products.getAll();

    if (productos.length <= 0) {
      return res.render("productos", { user: req.user, listExists });
    };

    listExists = true;

    if (filtros) {
      const tags = filtros.split("-");
      productos = await db.Products.getByTags(tags);
    };

    res.render("productos", {
      user: req.user,
      tagsFiltrables,
      productos: productos,
      listExists,
    });
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function postProductos(req, res) {
  try {
    const { cant } = req.query;

    if (cant <= 0) {
      return res.redirect("/productos");
    };
    if (!cant) {
      const prodMocks = Faker.getProdMocks();
    } else {
      const prodMocks = Faker.getProdMocks(cant);
    };

    await db.Products.saveMany(prodMocks);

    return res.redirect("/productos");
  } catch (error) {
    Logger.logError.error(error);
  };
};

// CART

async function getCarrito(req, res) {
  try {
    const dueñoId = req.user.email;
    const { user } = req;
    let carritoExists = false;

    let carritoId = await db.Carros.getCarritoIdByDueño(dueñoId);
    if (!carritoId) {
      return res.render("carrito", { user: user, carritoExists });
    };

    carritoExists = true;

    const carrito = await db.Carros.getById(carritoId);
    const productosId = carrito.productos;

    const miCarrito = [];

    for (let i = 0; i < productosId.length; i++) {
      miCarrito.push(await db.Products.getById(productosId[i]));
    }

    res.render("carrito", {
      user: user,
      carritoId,
      miCarrito,
      productosId,
      carritoExists,
    });
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function getAddCarritoProd(req, res) {
  try {
    const { referer } = req.headers;
    const { email, prodId } = req.params;

    let carritoId = await db.Carros.getCarritoIdByDueño(email);
    if (!carritoId) {
      carritoId = await db.Carros.crearCarrito(email);
    }

    await db.Carros.añadirProducto(carritoId, prodId);

    return res.redirect(referer);
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function getDeleteCarritoProd(req, res) {
  try {
    const { referer } = req.headers;
    const { email, prodId } = req.params;

    let carritoId = await db.Carros.getCarritoIdByDueño(email);

    await db.Carros.eliminarProducto(carritoId, prodId);

    return res.redirect(referer);
  } catch (error) {
    Logger.logError.error(error);
  }
}

async function getPedidoCarrito(req, res) {
  try {
    const { referer } = req.headers;
    const { email, productosId } = req.params;
    const productos = productosId.split(",");
    const user = await db.Users.getByEmail(email);
    // enviar email al admin pedido de compra
    /*     Logger.logConsola.info("\n Comprador user: " + user + "\n Carrito: " + productos) */

    const mailOptions = {
      from: "Coderhouse EcommerceApp",
      to: admEmail,
      subject: `Nuevo pedido de compra de ${user.nombre}, correo : ${user.email}`,
      html: `${productos}
      `,
    };
    Mailer.ecommerceGmail.sendMail(mailOptions);

    // enviar wpp al admin pedido de compra

    Logger.logConsola.info(
      "Administrador: " +
        `Nuevo pedido de compra de ${user.nombre} ${user.apellido}, correo : ${user.email}`
    );

    // enviar wpp al usuario pedido de compra
    Logger.logConsola.info(
      "Comprador: " +
        "Su pedido de compra ha sido recibido y esta en proceso. Le agradecemos por su confianza y paciencia"
    );
    return res.redirect(referer);
  } catch (error) {
    Logger.logError.error(error);
  }
}

//Perfil

function getPerfil(req, res) {
  res.render("perfil", { user: req.user });
}

//Fails

function getFailSignin(req, res) {
  res.render("errorSignin");
}

function getFailLogin(req, res) {
  res.render("errorLogin");
}

//Websocket
async function websocket (socket) {
  socket.on("addMocks", async (data) => {
    const prodMocks = Faker.getProdMocks();
    await db.Products.saveMany(prodMocks);
});
  socket.on("deleteAllProductos", async (data) => {
    await db.Products.deleteAll();
  });
}

export default{
  getSignin,
  getFailSignin,
  getLogin,
  getFailLogin,
  getLogout,
  getIndex,
  getProductos,
  postProductos,
  getAddCarritoProd,
  getDeleteCarritoProd,
  getPedidoCarrito,
  getCarrito,
  getPerfil,
  checkAuthentication,
  uploadAvatar,
  websocket
};

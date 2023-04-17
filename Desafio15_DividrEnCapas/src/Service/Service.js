import Productos from "../Persistencia/contenedores/mongohijos/Productos.js";
import Mensajes from "../Persistencia/contenedores/mongohijos/Mensajes.js";
import Usuarios from "../Persistencia/contenedores/mongohijos/Usuarios.js";
import Carritos from "../Persistencia/contenedores/mongohijos/Carritos.js";

const Users = new Usuarios();
const Messages = new Mensajes();
const Products = new Productos();
const Carros = new Carritos();

async function getAllProducts(){
    return await Products.getAll();
};

async function getProdById(id){
    return await Products.getById(id);
}

async function getProdByTags(tags){
    return await Products.getByTags(tags);
};

async function saveManyProducts(prods){
    return await Products.saveMany(prods);
};

async function deleteAllProds(){
    await Products.deleteAll();
    return;
};

async function createCart(owner){
    return await Carros.crearCarrito(owner);
};

async function addProdToCart(cartId, prodId){
    return await Carros.añadirProducto(cartId,prodId);
};

async function getCartByOwner(owner){
    return await Carros.getCarritoIdByDueño(owner);
};

async function getCartById(id){
    return await Carros.getById(id);
};

async function deleteProdFromCart(cartId, prodId){
    return await Carros.eliminarProducto(cartId, prodId);
};

async function getUserByEmail(email){
    return await Users.getByEmail(email);
};

export default {
    getAllProducts,
    getProdById,
    getProdByTags,
    saveManyProducts,
    deleteAllProds,
    createCart,
    addProdToCart,
    getCartByOwner,
    getCartById,
    deleteProdFromCart,
    getUserByEmail
};
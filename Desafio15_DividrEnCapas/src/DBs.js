import Productos from "./Persistencia/contenedores/mongohijos/Productos.js"
import Mensajes from "./Persistencia/contenedores/mongohijos/Mensajes.js"
import Usuarios from "./Persistencia/contenedores/mongohijos/Usuarios.js"
import Carritos from "./Persistencia/contenedores/mongohijos/Carritos.js"

const Users = new Usuarios()
const Messages = new Mensajes()
const Products = new Productos()
const Carros = new Carritos()

export {
  Users,
  Messages,
  Products,
  Carros
}

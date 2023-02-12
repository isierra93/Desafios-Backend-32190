const socket = io();

//Se instancia Schemas para poder desnormalizar
const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "id"});

const messageSchema = new normalizr.schema.Entity("text",{
    author: authorSchema
}, {idAttribute: "id"});

const messagesSchema = new normalizr.schema.Entity("mensajes", {
    mensajes: [messageSchema]
});


//Recibe los productos almacenados y los impacta en el DOM
socket.on(`productos`, (productos) => {
  let html = `<h3 class="alert alert-danger text-center">No se encontraron productos</h3>`;

  if (productos) {
    const prodhtml = productos.map(prod => {
      return `<tr>
            <td>${prod.id}</td>
            <td>${prod.nameInput}</td>
            <td>${prod.priceInput}</td>
            <td>
            <img style="height: 2rem; width: 2rem;" src=${prod.linkInput} alt="${prod.nameInput}">
            </td>
            </tr>`
    }).join('');
    html = `
            <table class="table table-dark">
              <tr style="color: yellow;"> <th>ID</th> <th>Nombre</th> <th>Precio</th> <th>Link</th> </tr>
              ${prodhtml}
            </table>`;
  };
  document.getElementById("tableProductos").innerHTML = html;
});

//Recibe los mensajes almacenados y los impacta en el DOM
socket.on(`mensajes`, (mensajes) => {
  /* const listMensajes = {
    id: "coder",
    mensajes: msg
} */
  /* const mensajes = denormalize(mensajesNormalizados, messagesSchema); */

  let html = `<h3 class="alert alert-danger text-center">No se encontraron productos</h3>`;
  if (mensajes) {
    html = mensajes.map(msg => {
      return `<div><strong style="color: blue;">${msg.author.nombre}</strong> [<img style="height: 2rem; width: 2rem;" src=${msg.author.avatar} >] : ${msg.text}</div>`
    }).join(``);
  };
  document.getElementById(`mensajes`).innerHTML = html;
});

//Funciones para agregar mensajes y productos
function addProduct() {
  const nameInput = document.getElementById(`nameInput`);
  const priceInput = document.getElementById(`priceInput`);
  const linkInput = document.getElementById(`linkInput`);
  if (nameInput.value && priceInput.value && linkInput.value) {
    const product = {
      nameInput: nameInput.value,
      priceInput: priceInput.value,
      linkInput: linkInput.value
    }
    socket.emit(`new-prod`, product);
    nameInput.value = ``;
    priceInput.value = ``;
    linkInput.value = ``;
  };
  return false;
}

// SIMPLIFICAR ACA LA CREACION DE OBJ!!!
function addMessage() {
  const idUser = document.getElementById("idUser").value;
  const nameUser = document.getElementById("nameUser").value;
  const lastNameUser = document.getElementById("lastNameUser").value;
  const ageUser = document.getElementById("ageUser").value;
  const nickNameUser = document.getElementById("nickNameUser").value;
  const avatarUser = document.getElementById("avatarUser").value;
  const textMsg = document.getElementById("textMsg").value;
  const obj = {
    author: {
      id: idUser,
      nombre: nameUser,
      apellido: lastNameUser,
      edad: ageUser,
      alias: nickNameUser,
      avatar: avatarUser
    },
    text: textMsg
  };
  socket.emit('new-msg', obj);
  textMsg.value = "";
  return false
}
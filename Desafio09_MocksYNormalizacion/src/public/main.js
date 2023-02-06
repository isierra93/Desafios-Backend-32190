const socket = io();

//Recibe los productos almacenados y los impacta en el DOM
socket.on(`productos`, (productos) => {
    let html = `<h3 class="alert alert-danger text-center">No se encontraron productos</h3>`;

    if(productos){
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
    let html = `<h3 class="alert alert-danger text-center">No se encontraron productos</h3>`;
    if(mensajes){
        html = mensajes.map( msg => {
            return `<div><strong style="color: blue;">${msg.author}</strong> [${msg.time}] : ${msg.text}</div>`
        }).join(``);
    };
    document.getElementById(`mensajes`).innerHTML = html;
});

//Funciones para agregar mensajes y productos
function addProduct(){
    const nameInput = document.getElementById(`nameInput`);
    const priceInput = document.getElementById(`priceInput`);
    const linkInput = document.getElementById(`linkInput`);
    if(nameInput.value && priceInput.value && linkInput.value){
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

function addMessage() {
    const email = document.getElementById("email");
    const text = document.getElementById("mensajeInput");
    if (email.value && text.value) {
      const message = {
        author: email.value,
        text: text.value,
        time: new Date().toLocaleString()
      };
      socket.emit('new-msg', message);
      text.value = ``;
    };
    return false;
  };


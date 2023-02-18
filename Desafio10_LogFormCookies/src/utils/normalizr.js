import { normalize, denormalize, schema } from "normalizr";
import util from "util";

function print(objeto){
    console.log(util.inspect(objeto, false, 12, true))
}

const msg = [
    {
      "author": {
        "id": "Ivan@sierra.com",
        "nombre": "Ivan",
        "apellido": "Sierra",
        "edad": "29",
        "alias": "Ibiza",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1241.jpg"
      },
      "text": "Holaaaa",
      "id": 1
    },
    {
      "author": {
        "id": "Ivan@sierra.com",
        "nombre": "Ivan",
        "apellido": "Sierra",
        "edad": "29",
        "alias": "Ibiza",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1241.jpg"
      },
      "text": "Hay alguien?",
      "id": 2
    },
    {
      "author": {
        "id": "Coty@marchesi.com",
        "nombre": "Constanza",
        "apellido": "Marchesi",
        "edad": "25",
        "alias": "Coty",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/102.jpg"
      },
      "text": "Siii buenas!",
      "id": 3
    },
    {
      "author": {
        "id": "Ivan@sierra.com",
        "nombre": "Ivan",
        "apellido": "Sierra",
        "edad": "29",
        "alias": "Ibiza",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1241.jpg"
      },
      "text": "como vaaaa? Todo bieen",
      "id": 4
    },
    {
      "author": {
        "id": "Ivan@sierra.com",
        "nombre": "Ivan",
        "apellido": "Sierra",
        "edad": "29",
        "alias": "Ibiza",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1241.jpg"
      },
      "text": "Es re tardeee",
      "id": 5
    },
    {
      "author": {
        "id": "Coty@marchesi.com",
        "nombre": "Constanza",
        "apellido": "Marchesi",
        "edad": "25",
        "alias": "Coty",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/102.jpg"
      },
      "text": "Amonchiii",
      "id": 6
    }
]

const listMensajes = {
    id: "coder",
    mensajes: msg
}

const authorSchema = new schema.Entity("author", {}, {idAttribute: "id"});

const messageSchema = new schema.Entity("text",{
    author: authorSchema
}, {idAttribute: "id"});

const messagesSchema = new schema.Entity("mensajes", {
    mensajes: [messageSchema]
});

/* const objNormalizado = normalize(listMensajes, messagesSchema);
print(objNormalizado) */

export default messagesSchema;
import { schema } from "normalizr";

const authorSchema = new schema.Entity("author", {}, {idAttribute: "id"});

const messageSchema = new schema.Entity("text",{
    author: authorSchema
}, {idAttribute: "id"});

const messagesSchema = new schema.Entity("mensajes", {
    mensajes: [messageSchema]
});

export default messagesSchema;
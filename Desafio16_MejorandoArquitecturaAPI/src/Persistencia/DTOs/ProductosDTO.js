class ProductosDto {
    constructor({titulo, precio, thumbnail,tags}){
        this.titulo = titulo,
        this.precio = precio,
        this.thumbnail = thumbnail,
        this.tags = tags
    };
};

export default function getProductosDTO(data)  {
    if(Array.isArray(data)) {
        return data.map(e => new ProductosDto(e));
    } else {
        return new ProductosDto(data);
    };
};
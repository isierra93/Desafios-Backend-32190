import getProductosDTO from "../DTOs/ProductosDTO";
import ProductosDAOFactory from "../Factory/ProductosDAOFactory";

export default class ProductosRepo{
    constructor(){
        this.DAO = ProductosDAOFactory.getDAO();
    };

    async get(id){
        let productosDTO;

        if(id){
            productosDTO = getProductosDTO(await this.DAO.getById(id));
        }else{
            productosDTO = getProductosDTO(await this.DAO.getAll());
        }
        
        return productosDTO;
    }

    async guardar(productos){
        const ProductosDTO = getProductosDTO(productos);
        await this.DAO.save(ProductosDTO);
    };

    async actualizar(id, producto){
        const productoDTO = getProductosDTO(producto);
        const actualizado = await this.DAO.putById(id, productoDTO);
        return actualizado;
    }

    async delete(id){
        let deleted;
        if(id){
            deleted = await this.DAO.deleteById(id);
        }else{
            this.DAO.deleteAll();
            deleted = true;
        }
        return deleted;
    }
};
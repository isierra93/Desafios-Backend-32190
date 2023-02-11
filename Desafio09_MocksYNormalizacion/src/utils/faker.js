import {faker} from "@faker-js/faker";

const generarProductos = async (cant) =>{

    try{
        const prods = [];
    let i = 0;
    while(i < cant){
        let prod = {
            nombre: faker.name.fullName(),
            precio: faker.random.numeric(4),
            foto: faker.internet.avatar()
        }
        prods.push(prod);
        i++;
    };
    return prods;

    }catch(err){
        throw new Error (err);
    };
}

export default  generarProductos;
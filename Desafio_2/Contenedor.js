//Import de libreria FS
const fs = require(`fs`);



class Contenedor{
    //Se declara contenedor, con el nombre del archivo y su extension
    constructor(nameFile, extension=`txt`){
        this.nameFile = nameFile,
        this.extension = extension
    };

    //Chequea si ya existe el archivo
    checkIfExist(){
        return fs.existsSync(`./${this.nameFile}.${this.extension}`);
    }
    //Guarda un objeto nuevo en el Array
    async save(obj){
        //Si existe vamos a leer el contenido previo y sumar el obj, ademas de reasignar IDs
        if(this.checkIfExist()){
            try{
                let arr = await fs.promises.readFile(`./${this.nameFile}.${this.extension}`, `utf-8`);
                let arrParse = JSON.parse(arr);
                arrParse.push(obj);
                //Se asigna un ID a cada elemento y se incrementa.
                let id = 0
                arrParse.map(elem =>{
                    elem.id = id+1;
                    id++
                });
                //Guarda el array nuevo en el archivo
                await fs.promises.writeFile(`./${this.nameFile}.${this.extension}`, JSON.stringify(arrParse, null, 2));
                //Retorna el ultimo ID asignado
                return arrParse.length
            }catch(err){
                throw new Error (`Error actualizando archivo: ${err}`);
            }
        };
        //Si no existe previamente un archivo, creamos uno con el nuevo objeto
        try{
            let arr = []
            obj.id = 1;
            arr.push(obj)
            await fs.promises.writeFile(`./${this.nameFile}.${this.extension}`, JSON.stringify(arr, null, 2));
        }catch(err){
            throw new Error (`Error creando nuevo archivo: ${err}`);
        };
    }
    //Recibe un ID y devuelve el producto con ese id si es que existe, sino NULL
    async getById(numberId){
        if(this.checkIfExist()){
            try{
                let arr = await fs.promises.readFile(`./${this.nameFile}.${this.extension}`, `utf-8`);
                let arrParse = JSON.parse(arr);
                let prod = null;
                arrParse.map(elem =>{
                    if(elem.id == numberId){
                        prod = elem;
                    }
                });
                return prod
            }catch(err){
                throw new Error (`Error buscando ID en el archivo: ${err}`);
            };
        };
    };
    async getAll(){
        if(this.checkIfExist()){
            try{
                let arr = await fs.promises.readFile(`./${this.nameFile}.${this.extension}`, `utf-8`);
                let arrParse = JSON.parse(arr);
                return arrParse;
            }catch(err){
                throw new Error (`Error de lectura en el archivo: ${err}`);
            }
        }
        return null
    }
    //Elimina del archivo el objeto con el ID buscado
    async deleteById(numberId){
        //Si el archivo existe, lo lee para traer sus datos
        if(this.checkIfExist()){
            try{
                let arr = await fs.promises.readFile(`./${this.nameFile}.${this.extension}`, `utf-8`);
                let arrParse = JSON.parse(arr);
                //Se recorre el array descartando el producto con el ID solicitado
                let newArr = []
                arrParse.map(elem =>{
                    if(elem.id !== numberId){
                        newArr.push(elem);
                    }
                });
                //Reasigna ID incrementando
                let id = 1;
                newArr.map(elem =>{
                    elem.id = id;
                    id++
                });
                //Se sobreescribe el archivo con el nuevo array
                await fs.promises.writeFile(`./${this.nameFile}.${this.extension}`, JSON.stringify(newArr, null, 2));
            }catch(err){
                throw new Error (`Error de lectura en el archivo: ${err}`);
            }
        }
        return null
    }
    async deleteAll(){
        if(this.checkIfExist()){
            try{
                await fs.promises.unlink(`./${this.nameFile}.${this.extension}`);
                }catch(err){
                    throw new Error (`Error borrando el archivo: ${err}`);
                };
        }
    };
};

const papa = {name: `Papa`, price: 120};
const cebolla = {name: `Cebolla`, price: 200};
const frutilla = {name: `Frutilla`, price: 400};
const huevos = {name: `Huevos`, price: 700};

const admin = new Contenedor(`Productos`);

/* //Guarda un producto en el archivo
admin.save(cebolla) */

/* //Muestra el producto elegido por ID
admin.getById(2).then(res =>{
    console.log(res)
}) */

/* //Muestra todos los productos del array, si no devuelve NULL
admin.getAll().then(res =>{
    console.log(res)
}); */

/* //Borra elemento por su ID
admin.deleteById(2) */

/* //Elimina el archivo
admin.deleteAll() */
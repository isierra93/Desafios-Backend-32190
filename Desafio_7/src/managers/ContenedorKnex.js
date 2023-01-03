const knex = require(`knex`);

class ClienteSQL{
    //Constructor, recibe opc de configuracion db y la tabla sobre la cual trabajar
    constructor(options, table){
        this.knex = knex(options);
        this.table = table;
    }
    //Trae todos los productos de la tabla
    async getAll(){
        try{
            return this.knex(this.table).select(`*`);
        }catch(err){
            throw new Error (err);
        };
    };
    //Guarda productos en la tabla
    async save(item){
        try{
            return this.knex(this.table).insert(item);
        }catch(err){
            throw new Error (err);
        };
    };
    //Verificar si existe la tabla. Si no existe crearla
    async checkTableProd(){
        try{
            this.knex.schema.hasTable(this.table).then
            (exist =>{
                if(exist){
                    return console.log(`Tabla ${this.table} ya existe`)
                }
                return this.knex.schema.createTable(`${this.table}`, table => {
                    table.increments(`id`).primary()
                    table.string(`title`, 50).notNullable()
                    table.float(`price`).notNullable()
                    table.string(`thumbnail`, 10000)
                    console.log(`Tabla ${this.table} no existia, se crea`)
                })
            })
        }catch(err){
            throw new Error (err);
        }
    }

    async checkTableMsg(){
        try{
            this.knex.schema.hasTable(this.table).then
            (exist =>{
                if(exist){
                    return console.log(`Tabla ${this.table} ya existe`)
                }
                return this.knex.schema.createTable(`${this.table}`, table => {
                    table.increments(`id`).primary()
                    table.string(`author`, 50).notNullable()
                    table.string(`date`, 50).notNullable()
                    table.string(`text`, 1000).notNullable()
                    console.log(`Tabla ${this.table} no existia, se crea`)
                })
            })
        }catch(err){
            throw new Error (err);
        }
    }

    async close(){
        this.knex.destroy();
    }
}

module.exports = ClienteSQL
class Usuario {
    constructor(nombre, apellido, libros=[], mascotas=[]) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.libros = libros,
            this.mascotas = mascotas
    }
    getFullName(){
        return `${this.apellido} ${this.nombre}`;
    }
    addMascota(name){
        this.mascotas.push(name);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(authorName, bookName){
        const newBook = {
            authorName,
            bookName
        }
        this.libros.push(newBook);
    }
    getBookNames(){
        const bookNames = []
        this.libros.map(book =>{
            bookNames.push(book.bookName);
        });
        return bookNames;
    }
}

//Se declara usuario y se obtiene su nombre
const admin = new Usuario(`Ivan`, `Sierra`);
console.log(admin.getFullName());
//Se agrega mascota y se muestra por consola
admin.addMascota(`Champiñon`);
console.log(admin.mascotas)
//Retorna la cantidad de mascotas que tiene el usuario
console.log(admin.countMascotas());
//Recibe dos Strings y los agrega al Array de libros como autor y nombre del libro
admin.addBook(`J. K. Rowling`,`Harry Potter`);
admin.addBook(`Stephen King`, `El resplandor`);
console.log(admin.libros);
//Retorna un Array con solo los nombres de los libros
console.log(admin.getBookNames());
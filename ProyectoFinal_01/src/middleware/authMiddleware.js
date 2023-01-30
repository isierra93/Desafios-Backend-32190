export async function middleware (req, res , next ){
    //Variable para Administradores, se va a confirugirar mas adelante
    const adm = true;
    if(!adm){
        res.json({error:-1, descripcion: `Ruta o metodo no autorizado.`});
    }
    console.log(`Acceso autorizado`)
    next()
}
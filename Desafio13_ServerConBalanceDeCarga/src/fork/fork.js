function calculo() {
    let sum = 0;
    for (let i = 0; i < 5e9; i ++){
        sum +=1;
    }
    return sum
}

process.on('message', msg =>{
    console.log('Mensaje recibido: ' + msg);
    console.log('Hilo iniciado: ' + process.pid);
    const result = calculo()
    process.send(result);
    process.exit()
});

process.on('exit', () =>{
    console.log('Hilo terminado: ' + process.pid);
});

process.send('OK');
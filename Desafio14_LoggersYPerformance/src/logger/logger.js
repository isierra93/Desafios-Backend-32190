import logger from "log4js";

/*  ● Loggear todos los niveles a consola (info, warning y error)
    ● Registrar sólo los logs de warning a un archivo llamada warn.log
    ● Enviar sólo los logs de error a un archivo llamada error.log */

const logOptions = {
    appenders:{
        consoleLog:{type: 'console'},
        fileWarn:{type: 'file', filename:'./debug-logs/warn.log'},
        fileError:{type: 'file', filename: './debug-logs/error.log'}
    },
    categories:{
        default:{appenders:['consoleLog'], level:'trace'},
        console:{appenders:['consoleLog'], level:'info'},
        warning:{appenders:['fileWarn'], level:'warn'},
        error:{appenders:['fileError'], level:'error'},
    }
}

logger.configure(logOptions);


const logDef = logger.getLogger();
const logConsola = logger.getLogger('console');
const logWarning = logger.getLogger('warning');
const logError = logger.getLogger('error');

export {
    logDef,
    logConsola,
    logWarning,
    logError
}

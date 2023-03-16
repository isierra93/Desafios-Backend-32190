import argv from "./yargs.js";

const returnInfo = async () =>{
    const data = {
        argumentosDeEntrada: argv,
        OS: process.platform,
        NodeVersion:process.version,
        totalMemory: process.memoryUsage().rss,
        pathExec: process.execPath,
        IDprocess: process.pid,
        path: process.cwd(),
    };
    return data;
};

export default returnInfo;
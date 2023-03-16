import {argv} from "../config/config.js";
import os from "os"

const returnInfo = async () =>{
    const data = {
        argumentosDeEntrada: argv,
        OS: process.platform,
        NodeVersion:process.version,
        totalMemory: process.memoryUsage().rss,
        pathExec: process.execPath,
        IDprocess: process.pid,
        path: process.cwd(),
        numberOfProcessors: os.cpus().length
    };
    return data;
};

export default returnInfo;
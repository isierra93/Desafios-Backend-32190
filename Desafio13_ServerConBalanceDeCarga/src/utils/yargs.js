import yargs from "yargs";
import {hideBin} from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).alias({
  p: "PORT",
  m: 'MODO'
}).default({
    p: 8080,
    m: 'FORK'
}).parse();

export default argv;
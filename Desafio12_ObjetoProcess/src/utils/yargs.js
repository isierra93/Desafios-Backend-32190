import yargs from "yargs";
import {hideBin} from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).alias({
  p: "PORT"
}).default({
    p: 8080
}).parse();

export default argv;
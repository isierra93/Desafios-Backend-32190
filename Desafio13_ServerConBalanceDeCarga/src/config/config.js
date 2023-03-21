import dotenv from "dotenv";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

export const argv = yargs(hideBin(process.argv)).alias({
    p: 'PORT',
    m: 'MODE'
  }).default({
      p: 8080,
      m: 'FORK'
  }).parse();

dotenv.config();

export const DOT_ENV = {
    URL: process.env.URL,
    SECRET: process.env.SECRET,
    PORT: argv.PORT,
    MODE: argv.MODE
};
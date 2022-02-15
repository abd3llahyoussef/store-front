import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POTGRES_HOST, POTGRES_DB, POTGRES_USER, POTGRES_PASSWORD, ENV } =
  process.env;

let client = new Pool();
console.log(ENV);
if (ENV == "test") {
  client = new Pool({
    host: POTGRES_HOST,
    database: POTGRES_DB,
    user: POTGRES_USER,
    password: POTGRES_PASSWORD,
  });
}

if (ENV == "dev") {
  client = new Pool({
    host: POTGRES_HOST,
    database: POTGRES_DB,
    user: POTGRES_USER,
    password: POTGRES_PASSWORD,
  });
}

export default client;

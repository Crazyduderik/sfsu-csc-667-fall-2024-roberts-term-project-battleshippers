import pgPromise, { IDatabase, IMain } from "pg-promise";
import * as dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER || "csc667user",
  password: process.env.DB_PASSWORD || "csc667",
  database: process.env.DB_NAME || "csc667db",
  ssl: process.env.DB_SSL === "true",
};

// Log configuration for debugging
console.log("Database Configuration:", dbConfig);

const pgp: IMain = pgPromise();
const connection: IDatabase<{}> = pgp(dbConfig);

export default connection;

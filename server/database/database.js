import mysql from "mysql";
import { promisify } from "util";

let connectedToDatabase;

const connecton = mysql.createConnection ({
    host: localhost,
    user: "root",
    password: "",
    database: "reconnecting"
});

connecti
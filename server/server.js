import http from "http";
import "dotenv/config";
import { connectDatabase } from "./database/database.js"

const port = process.env.PORT || 5678;
let connectedtodatabase = false;

(async function databaseState() {
    try {
        connectedtodatabase = await connectDatabase();
    } catch (error) {
        console.error(`Error connecting to database!`);
    }
})();

const server = http.createServer(async (req, res) => {
    if (connectedtodatabase) {
        
    }
});

server.listen(port, () => {
    console.log(`Server.listening on port: ${port}`);
});
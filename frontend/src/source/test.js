import http from "http";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const port = 1221;

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);

const server = http.createServer(async (req, res) => {
   try {
    if (req.method === "GET") {
        if (req.url === '/') {
            const file = await fs.open("messages.json");
            
        }
    }
   } catch (error) {
    console.error(`Error!`);
    return;
   }
});

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

if (null) {
    console.log("This is true");
} else {
    console.log("This is false");
}
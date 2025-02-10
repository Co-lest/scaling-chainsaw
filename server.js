import http from "http";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
// import mysql from "mysql2"

const port = process.env.PORT || 3003; //aws ssm vault - alternatives

const server = http.createServer((req, res) => {
    let filepath;

    const __filname = fileURLToPath(
        import.meta.url);
    const __dirname = path.dirname(__filname);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.url === "/") {
        filepath = "index.html";
        console.log(req.url);

        const fullpath = path.join(__dirname, "src", filepath);
        (async() => {
            try {
                const fileData = await fs.readFile(fullpath);
                const ext = path.extname(filepath);
                const contentType = {
                    ".html": "text/html",
                    ".css": "text/plain",
                    ".js": "text/javscript",
                }[ext] || "text/plain";

                res.writeHead(200, { "Content-Type": contentType });
                res.end(fileData);
            } catch (error) {
                console.error(`Error loading the page: ${error}`);
                res.statusCode = 500;
                return;
            }
        })();
    } else if (req.url === "/favicon.ico") {

    } else {
        filepath = req.url;
        console.log(req.url);
    }

    if (req.method === "POST" && req.url === "/api/messages") {
        let body;

        req.on("data", (dataChunk) => {
            body += dataChunk.toString();
        });

        req.on("end", () => {
            console.log(`Received body: ${body}`);
            // res.writeHead(200, { "Content-Type": "application/json" });
            // res.end(JSON.stringify({ status: "success", receivedMessage: body }));
        });
    } else {
        // res.writeHead(404, { "Content-Type": "text/plain" });
        // res.end("Not found!");
    }

});

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});


// } else {
//     filepath = req.url;
//     // console.log(req.url);
//     // console.error(`No such request is valid!`);
//     // return;

//     const fullpath = path.join(__dirname, "public", filepath);
//     console.log("Serving Static file:", fullpath);
// }
// (async() => {
//     try {
//         const fileData = await fs.readFile(fullpath);
//         const ext = path.extname(filepath);
//         const contentType = {
//             ".html": "text/html",
//             ".css": "text/plain",
//             ".js": "text/javscript",
//         }[ext] || "text/plain";

//         res.writeHead(200, { "Content-Type": contentType });
//         res.end(fileData);
//     } catch (error) {
//         console.error(`Error loading the page: ${error}`);
//         res.statusCode = 500;
//         return;
//     }
// })();
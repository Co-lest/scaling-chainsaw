import http from "http";
import "dotenv/config"

const port = process.env.PORT || 5678;

const server = http.createServer((req, res) => {

});

server.listen(port, () => {
    console.log(`Server.listening on port: ${port}`);
});
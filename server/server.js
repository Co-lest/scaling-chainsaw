import http from "http";
import "dotenv/config";
import { WebSocketServer } from "ws";
import { connectDatabase, fetchHomepage, loginUser, insertUser } from "./database/database.js";

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (connectedtodatabase) {
  }
});

const wss = new WebSocketServer({ server });

//const client = new Set();

wss.on("connection", (ws) => {
  console.log(`A new user connected!`);

  //client(ws);

  ws.on("message", (data) => {
    const dataReceived = JSON.parse(data);

    if (connectedtodatabase) {
      if (dataReceived.type === "sign") {
        insertUser(dataReceived)
        .then(() => {
            let doesUserExist;
          (async () => {
            doesUserExist = await insertUser(dataReceived);
          })();

          if (doesUserExist) {
            console.log(`Username already taken!`);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send({type: "doesUserExist", bool: doesUserExist});
            }
          } else {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send({type: "doesUserExist", bool: doesUserExist});
            }
          }
        })
      } else if (dataReceived.type === "log") {
        loginUser(dataReceived)
        .then((logboool) => {
          if (logboool && ws.readyState === ws.OPEN) {
            console.log(`Logbool: ${logboool}`);
            ws.send(JSON.stringify({ IsloggedIn: logboool }));
          } else {
            console.log(`Username or password does not match: ${logboool}`);
            console.log(`Or disconnected from the ws client`);
            ws.send(JSON.stringify({ IsloggedIn: logboool }));
          }
        });
      } else if (dataReceived.type === "homepage") {
        // console.log(dataReceived);
        // fetchHomepage(dataReceived).then((userData) => {
        //   // console.log(userData[0].name);
        //   let profileObj = {};

        //   profileObj.name = userData[0].name;
        //   profileObj.interests = userData[0].interests;
        //   profileObj.age = userData[0].age;
        //   profileObj.school = userData[0].school;
        //   profileObj.type = "homeUserData";

        //   ws.send(JSON.stringify(profileObj));
        //  });
      }
    } else {
      console.error(`Cannot connect to database!`);
      throw new Error("Cannot connect to database!");
    }
  });

  ws.on("close", () => {
    console.log(`A user disconnected!`);
  });

  ws.on("error", () => {
    console.error(`Error connecting to client ws!`);
  });
});

server.listen(port, () => {
  console.log(`Server.listening on port: ${port}`);
});

import http from "http";
import "dotenv/config";
import { WebSocketServer } from "ws";
import { connectDatabase, loginUser, insertUser, friendsPage } from "./database/database.js";
import { FriendsPage } from "../frontend/src/components/friends.jsx";

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

    try {
      if (connectedtodatabase) {
        if (dataReceived.type === "sign") {
          insertUser(dataReceived)
          .then((insertResult) => {
            let sendObj = {};
            sendObj.type = "sign";
            sendObj.content = insertResult;
            console.log(sendObj);
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(sendObj));
            }
          })
        } else if (dataReceived.type === "log") {
          loginUser(dataReceived)
          .then((logbool) => {
            if (logbool && ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ logbool }));
            } else {
              console.log(`Username or password does not match: ${logbool}`);
              console.log(`Or disconnected from the ws client`);
              ws.send(JSON.stringify({ logbool }));
            }
          });
        } else if (dataReceived.type === "message") {
          console.log(`Received: ${dataReceived}`);
        } else if (dataReceived.type === "friendsPage") {
          //console.log(`Data received from friends page: ${dataReceived}`);
        } else if(dataReceived.type === "friendsPageSearch" || dataReceived.type === "friendsPageStart") {
          friendsPage(dataReceived)
          .then((friendsFound) => {
            if (typeof friendsFound === "object" && ws.readyState === ws.OPEN) {
              friendsFound.type = "friends";
              ws.send(JSON.stringify(friendsFound));
            } else {
              console.log(`No friends found or ws disconnected!`);
              //ws.send(JSON.stringify(friendsFound));
            }
          })
        } else if (dataReceived.type === "recommend") {
          friendsPage(dataReceived)
          .then((friendsFound) => {
            let sendFriends = {};
            sendFriends.type = "friendsFound";
            sendFriends.content = friendsFound;
  
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify(sendFriends));
            }
          })
        } else if (dataReceived.type === "search") {
          friendsPage(dataReceived)
          .then((friendsFound) => {

          });
        }
      } else {
        throw new Error("Cannot connect to database!");
      }
    } catch (error) {
      console.error(`Cannot connect to database!`);
      return;
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
  console.log(`Server listening on port: ${port}`);
});

import http from "http";
import "dotenv/config";
import { WebSocketServer } from "ws";
import { connectDatabase, fetchHomepage, loginUser, insertUser, friendsPage } from "./database/database.js";

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
        .then((insertResult) => {
            console.log(insertResult);

          if (!insertResult) {
            // console.log(`Username already taken!`);
            if (ws.readyState === ws.OPEN) {
                ws.send(insertResult);
            }
          } else {
            if (ws.readyState === ws.OPEN) {
                ws.send(insertResult);
            }
          }
        })
      } else if (dataReceived.type === "log") {
        loginUser(dataReceived)
        .then((logboool) => {
          if (logboool && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(logboool));
          } else {
            console.log(`Username or password does not match: ${logboool}`);
            console.log(`Or disconnected from the ws client`);
            ws.send(JSON.stringify(logboool));
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
  console.log(`Server listening on port: ${port}`);
});

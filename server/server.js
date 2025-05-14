import expres from "express";
import "dotenv/config";
import { handleLogin } from "./src/handleLogin.js";

const port = process.env.PORT || 5678;

const app = expres();

app.post("/API/login", handleLogin);

app.listen(port, () => {
  console.log(`Sever listening in port ${port}`);
});

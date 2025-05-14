import { loginUser } from "../database/database.js";

export async function handleLogin(req, res) {
  console.log("API reached!");
  console.log(JSON.stringify(req.data));

  // const result = await loginUser()
}

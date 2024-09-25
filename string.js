import { client } from "./client.js";

async function init() {
  // await client.expire("user:4", 10);
  const res = await client.get("user:4");
  console.log("user is ", res);
}
init();

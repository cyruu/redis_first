import express from "express";
import axios from "axios";
import { client } from "./client.js";
import dotenv from "dotenv";
import connect from "./connect.js";
import { redisData } from "./redisDataSchema.js";

const app = express();
dotenv.config();
connect();

app.get("/", async (req, res) => {
  const { data: datas } = await axios.get("http://localhost:9000/getdata");
  const titles = datas.map((data) => {
    return data.title;
  });

  let text = "";

  titles.forEach((title) => {
    text += title + "<br/>";
  });

  res.send(text);
});

app.get("/getdata", async (req, res) => {
  const cachedRedisData = await client.get("redisData");
  // get value from cache
  if (cachedRedisData) {
    return res.json(JSON.parse(cachedRedisData));
  }
  const data = await redisData.find();
  // add to cache
  await client.set("redisData", JSON.stringify(data));
  await client.expire("redisData", 30);
  return res.json(data);
});

app.listen(9000, () => {
  console.log("app running");
});

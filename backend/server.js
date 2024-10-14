import express from "express";
import "dotenv/config";
import process from "process";
import mongoose from "mongoose";
import Passwords from "./models/passwords.js";
import cors from "cors";

mongoose.connect(process.env.MONGO_URI);
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_URI);
app.get("/", async (req, res) => {
  const passwords = await Passwords.find();
  console.log(passwords);
  res.json(passwords);
});
app.post("/", async (req, res) => {
  let passData = await req.body;
  // let passData = {siteName: "site.com",username:"tester", password: "password", id:"123"};
  passData = await Passwords.create(passData);
  console.log("Password Saved", passData);
  res.send("Password Saved!");
});
app.post("/edit", async (req, res) => {
  // let passData = req.body;
  let passData = {
    siteName: "site.com",
    username: "tester",
    password: "password",
    id: "123",
  };
  Passwords.console.log("Password Saved", passData);
  res.send("Password Saved!");
});
app.delete("/", async (req, res) => {
  // let passData = { username: "", password: "", email: "", id: "123" };
  let passData = req.body;
  const passwordDelStat = await Passwords.deleteOne({ id: passData.id });
  console.log("Deleted: ", passData.id);
  console.log(passwordDelStat);
  res.json({ id: passData.id, passwordDelStat });
});
app.delete("/all", async (req, res) => {
  const passwords = await Passwords.deleteMany();
  console.log(passwords);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

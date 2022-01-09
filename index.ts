import express from "express";
import path from "path";
import fs from "fs";
const app = express();

app.use(express.static("."));
app.use(express.static("../Camera"));

app.get("/img", (req, res) => {
  res.send({ images: ["1.png"] });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3000, () => {
  console.log("startet");
});

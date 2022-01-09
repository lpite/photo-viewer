import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(express.static("."));
app.use(express.static("../storage/dcim/Camera"));
app.use(cors());

app.get("/img", (req, res) => {
  const files = fs.readdirSync("../storage/dcim/Camera");
  res.send({ images: files });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3000, () => {
  console.log("startet");
});

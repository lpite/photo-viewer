import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(express.static("."));
app.use(express.static("../storage/dcim/Camera"));
app.use(cors());

app.get("/img", (req, res) => {
  console.log("images");

  const files = fs.readdirSync("../storage/dcim/Camera");
  res.send({ images: files.reverse() });
});
app.get("/", (req, res) => {
  console.log("html");

  res.sendFile(path.join(__dirname, "./index.html"));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("startet", port);
});

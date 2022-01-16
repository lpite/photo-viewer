import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(express.static("static"));
app.use(express.static("../storage/dcim/Camera"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/index.html"));
});
app.get("/resize/:image", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/resize/resize.html"));
});
app.get("/img", (req, res) => {
  console.log("images");

  const files = fs.readdirSync("../storage/dcim/Camera");
  res.send({ images: files.reverse() });
});
app.get("/delete/:name", (req, res) => {
  // const oldPath = path.join(
  //   __dirname,
  //   `../storage/dcim/Camera/${req.params.name}`
  // );
  // const newPath = path.join(
  //   __dirname,
  //   `../storage/dcim/Deleted/${req.params.name}`
  // );
  // if (fs.existsSync("../storage/dcim/Deleted")) {
  //   fs.renameSync(oldPath, newPath);
  // } else {
  //   fs.mkdirSync("../storage/dcim/Deleted");
  //   fs.renameSync(oldPath, newPath);
  // }
  fs.rmSync(`../storage/dcim/Camera/${req.params.name}`);

  res.send("ok");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("startet", port);
});

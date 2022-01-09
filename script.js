const body = document.getElementsByTagName("body")[0];
async function main() {
  await fetch("http://192.168.0.106:3000/img").then((res) => {
    const json = res.json().then((re) => {
      console.log(re);
      re.images.forEach((img) => {
        const image = document.createElement("img");
        image.src = img;
        body.appendChild(image);
      });
    });
  });
}
main();

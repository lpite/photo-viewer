const body = document.getElementsByTagName("body")[0];

const bigView = document.createElement("div");
bigView.className = "big-view";
bigView.onclick = toggleBigView;
const bigViewImage = document.createElement("img");
bigViewImage.className = "big-view-image";
bigViewImage.onmousedown = drapAndDropImage;
bigViewImage.addEventListener("wheel", scaleBigViewImage);
bigViewImage.draggable = false;

bigView.appendChild(bigViewImage);
body.appendChild(bigView);

let imageScale = 1;

async function main() {
  await fetch(`${window.location.href}img`).then((response) => {
    response.json().then((json) => {
      json.images.forEach((img) => {
        const div = document.createElement("div");
        const image = document.createElement("img");
        //сделать кнопочки удаления и тд
        image.src = img;
        div.appendChild(image);
        div.onclick = toggleBigView;

        body.appendChild(div);
      });
    });
  });
}
main();

function toggleBigView(e) {
  if (e.target.src) {
    bigViewImage.src = e.target.src.split("/")[3];
  }

  if (bigView.className === "big-view") {
    bigView.className = "big-view open";
    imageScale = 1;
    setImageScale();
  } else {
    bigView.className = "big-view";
  }
}
function scaleBigViewImage(e) {
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
  });
  if (e.deltaY < 0) {
    //Это если вверх
    if (imageScale < 9) {
      imageScale += 0.2;
    }
  } else {
    if (imageScale > 0.2) {
      imageScale -= 0.2;
    }
  }
  setImageScale();
  window.removeEventListener("wheel", (e) => {
    e.preventDefault();
  });
}

function setImageScale(params) {
  bigViewImage.style.transform = `scale(${imageScale})`;
}
function drapAndDropImage(e) {
  e.preventDefault();
  console.log(e);
}

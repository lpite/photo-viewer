window.addEventListener("mousemove", (e) => {
  if (!drag) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

const body = document.getElementsByTagName("body")[0];

const bigView = document.createElement("div");
bigView.className = "big-view";
const bigViewImage = document.createElement("img");
bigViewImage.className = "big-view-image";

bigViewImage.addEventListener("wheel", scaleBigViewImage);
bigViewImage.addEventListener("mousedown", dropAndDropImageStart);
bigViewImage.addEventListener("mouseup", dropAndDragImageStop);
bigViewImage.addEventListener("mouseleave", dropAndDragImageStop);
bigViewImage.addEventListener("mousemove", dropAndDragImage);
bigViewImage.draggable = false;

const closeButton = document.createElement("button");
closeButton.className = "close-button";
closeButton.onclick = toggleBigView;

bigView.appendChild(bigViewImage);
bigView.appendChild(closeButton);
body.appendChild(bigView);

let imageScale = 1;

let mouseX = 0;
let mouseY = 0;
let drag = false;

async function main() {
  await fetch(`${window.location.href}img`).then((response) => {
    response.json().then((json) => {
      json.images.forEach((img) => {
        const div = document.createElement("div");
        const image = document.createElement("img");
        image.className = "small-image";
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
    toggleBodyScroll();
    bigViewImage.style.left = `${
      body.clientWidth / 2 - bigViewImage.clientWidth / 2
    }px`;
    bigViewImage.style.top = `${
      body.clientHeight - bigViewImage.clientHeight / 2
    }px`;
  } else {
    bigView.className = "big-view";
    toggleBodyScroll();
  }
}

function scaleBigViewImage(e) {
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
}

function setImageScale(params) {
  bigViewImage.style.transform = `scale(${imageScale})`;
}
let startigCoordX = 0;
let startigCoordY = 0;

function dropAndDropImageStart(e) {
  startigCoordX = parseInt(bigViewImage.style.left);
  startigCoordY = parseInt(bigViewImage.style.top);
  drag = true;
}
function dropAndDragImageStop() {
  drag = false;
}
function dropAndDragImage(e) {
  const DRAG_SENSITIVITY = 1;
  if (drag) {
    bigViewImage.style.top = `${
      startigCoordY + e.clientY * DRAG_SENSITIVITY - mouseY * DRAG_SENSITIVITY
    }px`;
    bigViewImage.style.left = `${
      startigCoordX + e.clientX * DRAG_SENSITIVITY - mouseX * DRAG_SENSITIVITY
    }px`;
  }
}

function toggleBodyScroll() {
  if (body.style.overflow === "hidden") {
    body.style.overflow = "initial";
  } else {
    body.style.overflow = "hidden";
  }
}

window.addEventListener("mousemove", (e) => {
  if (!drag) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});
window.addEventListener("keydown", (e) => {
  if (bigView.className === "big-view open") {
    if (e.key === "Tab") {
      e.preventDefault();
    }
    let imageIndex = imagesArray.indexOf(imageSelected);

    if (e.key === "ArrowLeft") {
      if (imageIndex === 0) {
        imageIndex = imagesArray.length - 1;
        bigViewImage.src = imagesArray[imagesArray.length - 1];
      } else {
        imageIndex -= 1;
        bigViewImage.src = imagesArray[imageIndex - 1];
      }
      setImageCoordinates();
    }
    if (e.key === "ArrowRight") {
      if (imageIndex === imagesArray[imagesArray.length - 1]) {
        bigViewImage.src = imagesArray[0];
        imageIndex = 0;
      } else {
        bigViewImage.src = imagesArray[imageIndex + 1];
        imageIndex++;
      }
      setImageCoordinates();
    }
    imageSelected = imagesArray[imageIndex];
    if (e.key === "Escape") {
      bigView.className = "big-view";
    }
  }
});

const body = document.getElementsByTagName("body")[0];

const mainElement = document.getElementsByTagName("main")[0];

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
mainElement.appendChild(bigView);

let imageScale = 1;
let imagesArray = [];
let imageSelected = "";

let mouseX = 0;
let mouseY = 0;
let drag = false;

async function main() {
  await fetch(`${window.location.href}img`).then((response) => {
    response.json().then((json) => {
      imagesArray = json.images;

      json.images.forEach((img) => {
        const div = document.createElement("div");
        div.className = "small-image-div";
        div.tabIndex = "0";
        const image = document.createElement("img");
        image.className = "small-image";
        //сделать кнопочки удаления и тд
        image.src = img;
        image.onclick = toggleBigView;
        div.addEventListener("keydown", (e) => {
          if (e.key === " " || e.key === "Enter") {
            image.click();
          }
        });
        const deleteButton = document.createElement("button");
        deleteButton.className = "small-image-div-button";
        deleteButton.tabIndex = "-1";
        deleteButton.textContent = "Удалить";
        deleteButton.onclick = () => deleteImage(img);
        div.appendChild(deleteButton);
        div.appendChild(image);

        mainElement.appendChild(div);
      });
    });
  });
}
main();

function toggleBigView(e) {
  let imageSrc = "";
  if (e.target.src) {
    imageSrc = e.target.src.split("/")[3];
  }
  bigViewImage.src = imageSrc;

  if (bigView.className === "big-view") {
    bigView.className = "big-view open";
    imageScale = 1;
    setImageScale();
    toggleBodyScroll();
    setImageCoordinates();
    imageSelected = imageSrc;
  } else {
    bigView.className = "big-view";
    imageSelected = "";
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
async function deleteImage(img) {
  if (window.confirm("Удалить?")) {
    await fetch(`${window.location.href}delete/${img}`);
    window.location.reload();
  }
}
function setImageCoordinates() {
  bigViewImage.style.left = `${
    window.screen.availWidth / 2 - bigViewImage.clientWidth / 2
  }px`;
  bigViewImage.style.top = `${
    window.screen.availHeight / 2 - bigViewImage.clientHeight / 2
  }px`;
}

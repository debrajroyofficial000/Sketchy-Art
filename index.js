const pixelRange = document.getElementById("range");
const pixelColor = document.getElementById("color");
const randomColor = document.getElementById("randomColor");
const clearBoardBtn = document.getElementById("clearBtn");
let currentColor = "#7AB2B2";
isRandom = false;

// random color generating  functions
function changeColorWithRandomColor(pixel) {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  pixel.target.style.backgroundColor = color;
}

//  sketch board creating function
function createPixels(numberOfPixels = 4) {
  const board = document.getElementById("board");
  //   removing previous content
  board.innerHTML = "";
  //   adding grid styles to it
  board.style.gridTemplateColumns = `repeat(${numberOfPixels},1fr)`;
  board.style.gridTemplateRows = `repeat(${numberOfPixels},1fr)`;

  //   generating pixels
  for (let i = 0; i < numberOfPixels * numberOfPixels; i++) {
    const pixel = document.createElement("dimouseoverv");
    pixel.addEventListener("mouseover", (e) => {
      if (isRandom) {
        changeColorWithRandomColor(e);
      } else {
        e.target.style.backgroundColor = currentColor;
      }
    });

    pixel.classList.add("pixel");
    board.appendChild(pixel);
  }
}

// setting pixel range
pixelRange.addEventListener("input", (e) => {
  let numberOfPixels = e.target.value;
  document.getElementById(
    "current"
  ).textContent = `Current : ${numberOfPixels}`;
  createPixels(numberOfPixels);
});

// setting pixel color to a certain color
pixelColor.addEventListener("input", (e) => {
  currentColor = e.target.value;
  randomColor.checked = false;
  isRandom = false;
});

// setting pixel color to random color
randomColor.addEventListener("change", (e) => {
  if (e.currentTarget.checked) {
    isRandom = true;
  } else {
    isRandom = false;
  }
});

// clearing board
clearBoardBtn.addEventListener("click", () => {
  const allPixels = document.querySelectorAll(".pixel");
  allPixels.forEach((pixel) => (pixel.style.backgroundColor = "white"));
});

createPixels();

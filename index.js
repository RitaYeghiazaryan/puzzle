const valueWrapper = document.querySelector(".fifteen");
let values = new Array(16).fill(0).map((item, index) => index + 1);

function addElement() {
  for (let el = 0; el <= values.length - 1; el++) {
    const itemValue = document.createElement("button");
    itemValue.classList.add("fifteen__item");
    itemValue.setAttribute("data-matrixId", values[el]);
    itemValue.innerHTML = values[el];
    valueWrapper.append(itemValue);
  }
}
addElement();
//1.Position
let matrix = getMatrix(
  (itemValue = Array.from(document.querySelectorAll(".fifteen__item"))),
  itemValue.map((item) => Number(item.getAttribute("data-matrixId")))
);

//2.Shuffle
document.getElementById("shuffle").addEventListener("click", () => {

  const shuffledArray = shuffleArray(matrix.flat());
  matrix = getMatrix(shuffledArray);
  setPositionItems(matrix);
});

function shuffleArray(arr) {
  return arr
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({
      value
    }) => value);
}

// 3. Change position by click
const blankNumber = 16;
valueWrapper.addEventListener("click", (event) => {
  const buttonNode = event.target.closest("button");
  if (!buttonNode) {
    return;
  }
  const buttonCoards = findCordinatesByNumber(matrix, buttonNode);
  const blankCoards = findCordinatesByNone(matrix);
  const isValid = isValidForSwap(buttonCoards, blankCoards);

  if (isValid) {
    swap(blankCoards, buttonCoards, matrix);
    setPositionItems(matrix);
  }
});
//4. Change position by arrows
window.addEventListener("keydown", (event) => {
  if (!event.key.includes("Arrow")) {
    return;
  }
  const blankCoards = findCordinatesByNone(matrix);
  const buttonCoards = {
    x: blankCoards.x,
    y: blankCoards.y,
  };
  const direction = event.key.split("Arrow")[1].toLowerCase();
  const maxIndexMatrix = matrix.length;
  switch (direction) {
    case "up":
      buttonCoards.y += 1;
      break;
    case "down":
      buttonCoards.y -= 1;
      break;
    case "left":
      buttonCoards.x += 1;
      break;
    case "right":
      buttonCoards.x -= 1;
      break;
  }
  if (
    buttonCoards.y >= maxIndexMatrix ||
    buttonCoards.y < 0 ||
    buttonCoards.x >= maxIndexMatrix ||
    buttonCoards.x < 0
  ) {
    return;
  }
  swap(blankCoards, buttonCoards, matrix);
  setPositionItems(matrix);
});
// 5. Show Won

// Helpers **************

function getMatrix(arr) {
  const matrix = [
    [],
    [],
    [],
    []
  ];
  let y = 0;
  let x = 0;
  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
}

function setPositionItems(matrix) {
  itemValue = Array.from(document.querySelectorAll(".fifteen__item"));
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      setItemStyle(value, x, y);
    }
  }
}
setPositionItems(matrix);

function setItemStyle(node, x, y) {
  const shiftPs = 100;
  node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%,0)`;
}

function findCordinatesByNumber(matrix, item) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === item) {
        return {
          x,
          y,
        };
      }
    }
  }
  return null;
}

function findCordinatesByNone(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x].innerHTML === "16") {
        return {
          x,
          y,
        };
      }
    }
  }
  return null;
}

function isValidForSwap(coords1, coords2) {
  const diffX = Math.abs(coords1.x - coords2.x);
  const diffY = Math.abs(coords1.y - coords2.y);
  return (
    (diffX === 1 || diffY === 1) &&
    (coords1.x === coords2.x || coords1.y === coords2.y)
  );
}

function swap(coards1, coards2, matrix) {
  const coards1Number = matrix[coards1.y][coards1.x];
  matrix[coards1.y][coards1.x] = matrix[coards2.y][coards2.x];
  matrix[coards2.y][coards2.x] = coards1Number;

  if (isWon(matrix)) {
    addWonClass()
  }
}





// Console notice
const countItems = 16;
if (itemValue.length !== 16) {
  throw new Error(`Must be equal ${countItems} items in HTML`);
}
//Hidden last item 
let nonedItem = (itemValue[countItems - 1].style.opacity = 0);

const winFlatArr = new Array(16).fill(0).map((_item, i) => i + 1);

function isWon(matrix) {
  let filterMatrix = matrix.flat().map((item, ind) => {
    return (ind)
  })

  for (let i = 0; i < winFlatArr.length; i++) {
    if (filterMatrix) {
      console.log("NO");
    }
  }
}
let wonClass = "fifteenWon"

function addWonClass() {

  setTimeout(() => {
    valueWrapper.classList.add(wonClass);

    setTimeout(() => {
      valueWrapper.classList.remove(wonClass);
    }, 1000);

  }, 200)
}



function swapCount(s) {


  let pos = [];
  for (let i = 0; i < s.length; ++i)
    if (s[i] == '[')
      pos.push(i);


  let count = 0;


  let p = 0;

  let sum = 0;

  let S = s.split('');

  for (let i = 0; i < s.length; ++i) {


    if (S[i] == '[') {
      ++count;
      ++p;
    } else if (S[i] == ']')
      --count;

    if (count < 0) {

      // Increment sum by number of
      // swaps required i.e. position
      // of next '[' - current position
      sum += pos[p] - i;
      let temp = S[i];
      S[i] = S[pos[p]];
      S[pos[p]] = temp;
      ++p;


      count = 1;
    }
  }
  return sum;
}


console.log(
  swapCount("[]][]["));












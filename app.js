let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;
let btns = ["red", "blue", "green", "yellow"];
let h2 = document.querySelector("h2");
let max = -1;
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}
function levelUp() {
  userSequence = [];
  h2.innerText = `Level ${level}`;
  level++;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomClr = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomClr}`);
  btnFlash(randomBtn);
  gameSequence.push(randomClr);
}

function check(idx) {
  if (gameSequence[idx] === userSequence[idx]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (max < level) {
      max = level;
    }
    h2.innerText = `HIGHEST SCORE: ${max} \n Game Over! Your score is ${level} \n Press any key to start again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);
  check(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}

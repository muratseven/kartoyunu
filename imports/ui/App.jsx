import React from "react";
import {
  getValue,
  setHighestValue,
  setLastValue,
  forms,
  getPlayerInfo,
} from "./Utilities.jsx";

const main = document.querySelector(".main");
const plevel = document.querySelector(".level");
const firstPlayer = document.querySelector(".firstPlayer");
const secondPlayer = document.querySelector(".secondPlayer");

let colors = [
  "yellow",
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "pink",
  "#A98307",
  "#432371",
  "#EEF3D2",
  "#7FFF00",
  "#BDE6F1",
  "#F806CC",
  "#00FFAB",
  "#969696",
  "#6DB1BF",
  "#6F58C9",
  "#FFDAAF",
  "#C69B7B",
  "#066163",
  "#B9F8D3",
  "#F1D00A",
  "#F38C83",
  "#E0DDAA",
  "#203239",
  "#C8A5D8",
  "#B33030",
  '#34B3F1',
  '#9EB23B',
  '#FF4949',
  '#FFEF82',
  '#FF5C8D',
  '#585123'

]; //random colors for squares

let level = 2; //level of game
let firstScore = 0; //score of game
let secondScore = 0; //score of game
let dim = 85; //size of square
let width = 300; //width of square
const usersInfo = getPlayerInfo(); //get player info
firstPlayer.textContent = usersInfo ? usersInfo.FirstName : "First Player :";
secondPlayer.textContent = usersInfo ? usersInfo.SecondName : " Second Player :";

const createBox = (value) => {
  main.style.width = width + width / 3 + "px"; //width of main div

  if (level == 3) {
    
    dim = dim + 5; //dim is increased by 5
    width = width + width; //width is increased by width
    main.style.width = width + "px"; //width of main div
    console.log('level 3 ?')
  }
  if (level == 4) {
    dim = dim - 5; //dim is increased by 5
    width = width + width / 5; //width is increased by width/3
    main.style.width = width + "px"; //width of main div
    console.log("level 4");
  }
  if (level == 5) {
    dim = dim; //dim is increased by 5
    width = width; //width is increased by width/3
    main.style.width = width + "px"; //width of main div
    console.log("level 5", width);
  }
  if (level == 6) {
    dim = dim - 5; //dim is increased by 5
    width = width - width / 10; //width is decreased by width/5
    main.style.width = width + "px"; //width of main div
    console.warn("level 6", width);
  }
  if (level == 7) {
    dim = dim - 5; //dim is increased by 5
    width = width ; //width is increased by width/5
    main.style.width = width + "px"; //width of main div
    console.warn("level 7", width);
  }
  if (level == 8) {
    dim = dim; //dim is increased by 5
    width = width; //width is increased by width/5
    main.style.width = width + "px"; //width of main div
    console.warn("level 8", width);
  }
  if (level == 9) {
    window.alert("🎉Congratulations, you have completed the game. Click to start over.")
    window.location.reload(false);
  }
  for (let i = 0; i < level * 8; i++) {
    const square = document.createElement("div");
    square.classList.add("square"); //add class to div
    square.setAttribute("color", ""); //set attribute to div
    square.style.width = dim + "px";
    square.style.height = dim + "px";
    main.appendChild(square); //append div to main div
  }
  const squares = document.querySelectorAll(".main .square"); //select all squares
  let count = 0; //count of squares
  let innerCount = []; //count of inner squares
  while (count < squares.length) {
    //while count is less than squares.length
    let index = Math.floor(Math.random() * squares.length); //random index
    if (!innerCount.includes(index)) {
      innerCount.push(index); //push index to innerCount
      count++; //increase count
    }
  }
  let b = 0;
  count = 0;
  let queue = value ? value : 0; //queue is value or 0
  queue % 2 != 0 //if queue is odd
    ? (firstPlayer.classList.remove("changePlayer"),
      secondPlayer.classList.add("changePlayer"))
    : (secondPlayer.classList.remove("changePlayer"),
      firstPlayer.classList.add("changePlayer"));
  for (let i = 0; i < squares.length; i++) {
    selectedColors = [];
    let color = colors[Math.floor(Math.random() * colors.length)]; 
    selectedColors.push(color)
    for (let f = 1; f <= 2; f++) {
      if (b < squares.length) {
        if ( colors[i] !== selectedColors ) { 
          squares[innerCount[b]].setAttribute("color", colors[i]);
      }
        b++;
      }
    }
  }
  let selectedsquares = []; //selectedsquares is empty
  squares.forEach((item, i) => {
    //for each item in squares
    item.addEventListener("click", (e) => {
      e.target.classList.toggle("rotatesquare");
      e.target.style.background = item.getAttribute("color");
      selectedsquares.push(e.target);
      if (selectedsquares.length == 2) {
        if (
          selectedsquares[0].getAttribute("color") ==
          selectedsquares[1].getAttribute("color") //if color of selectedsquares[0] is equal to color of selectedsquares[1]
        ) {
          if (queue % 2 == 0) {
            firstScore = firstScore + 5;
            firstPlayer.innerHTML = usersInfo.FirstName + ": " + firstScore;
            firstPlayer.classList.add("changePlayer"),
              secondPlayer.classList.remove("changePlayer");
          } else {
            secondScore = secondScore + 5;
            secondPlayer.innerHTML = usersInfo.SecondName + ": " + secondScore;
            queue % 2 != 0
              ? (firstPlayer.classList.remove("changePlayer"),
                secondPlayer.classList.add("changePlayer"))
              : (secondPlayer.classList.add("changePlayer"),
                firstPlayer.classList.remove("changePlayer"));
          }
          count++; // if correct square is clicked, increase count
          setLastValue(firstScore > secondScore ? firstScore : secondScore); //set lastValue to score
          setHighestValue(firstScore > secondScore ? firstScore : secondScore); //set HighestValue to score
          if (count === squares.length / 2) {
            //if count is equal to squares.length/2
            plevel.textContent = level++;
            colors = colors;
            main.innerHTML = "";
            createBox(queue);
          }
        } else {
          queue++;
          queue % 2 == 0
            ? (firstPlayer.classList.add("changePlayer"),
              secondPlayer.classList.remove("changePlayer"))
            : (secondPlayer.classList.add("changePlayer"),
              firstPlayer.classList.remove("changePlayer"));
          setTimeout(() => {
            selectedsquares[0].classList.toggle("rotatesquare");
            selectedsquares[0].style.background = "white";
            selectedsquares[1].classList.toggle("rotatesquare");
            selectedsquares[1].style.background = "white";
            selectedsquares = [];
          }, 500);
        }
        setTimeout(() => {
          selectedsquares = [];
        }, 500);
      }
    });
  });
};

export const App = () => {
  return (
    <>
      {/*if getPlayerInfo is not undefined, createBox is called*/}
      {getPlayerInfo() != undefined ? <>{createBox()}</> : <>{forms()}</>}
      {/* getValue is called*/}
      <>{getValue()}</>
    </>
  );
};

export default App;

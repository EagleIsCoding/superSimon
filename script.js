// Super Simon 

const red = document.getElementById("red");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const startButton = document.getElementById("startBtn");
const usernameDisplay = document.getElementById("usernameDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

/**
 * Generates a new sequence of colors
 * @param {Array} existingSequence 
 * @returns {Array} existingSequence            
 */
function generateSequence(existingSequence) {
    const values = ["red", "green", "yellow", "blue"];
    const newValue = values[Math.floor(Math.random() * values.length)];
    existingSequence.push(newValue);
    console.log(existingSequence); 
    return existingSequence; 
}

/**
 * Returns the div element of the color
 * @param {String} value 
 * @returns {HTMLElement}
 */
function getDivColor(value) {
    switch (value) {
        case 'red':
            return red;
        case 'green':
            return green;
        case 'yellow':
            return yellow;
        case 'blue':
            return blue;
        default:
          console.log(`${value} isn't a div color.`);
    }
}

/**
 * Returns the background color of the div
 * @param {String} value 
 * @returns {String}
 */
function getBackgroundColor(value) {
    switch (value) {
        case 'red':
            return "#ea3f3f";
        case 'green':
            return "#1eb21e";
        case 'yellow':
            return "#e8e811";
        case 'blue':
            return "#2626e2";
        default:
          console.log(`${value} isn't a div.`);
    }
}

/**
 * Displays the sequence of colors
 * @param {Array} value
 * @returns {void}
 */
function displaySequence(value) {
    for (let i = 0; i < value.length; i++) {
        setTimeout(() => {
            getDivColor(value[i]).style.backgroundColor = getBackgroundColor(value[i])
            console.log(getBackgroundColor(value[i]));
            setTimeout(() => getDivColor(value[i]).style.backgroundColor = "", 800)
        }, i * 1000);
    }
}

let gameBegin = false;
let currentSequence;
let userSequence = [];
let score = 0;
let username;

usernameDisplay.style.display = "none";
scoreDisplay.style.display = "none";

/**
 * Event listener for the start button
 */
startButton.addEventListener("click", () => {
    if (gameBegin) {
        return alert("Game already started");
    };
    gameBegin = true;
    usernameDisplay.style.display = "block";
    scoreDisplay.style.display = "block";
    if (!username) {
        username = window.prompt("Enter your username");
    }
    if (username === null || username === "") {
        return alert("Please enter a valid username");
    }
    usernameDisplay.textContent = `Username: ${username}`;
    scoreDisplay.textContent = "Score: 0";
    startButton.style.display = "none";
    setTimeout(function(){
        currentSequence = generateSequence([]);
        displaySequence(currentSequence);
    }, 1000);
});

/**
 * Event listener for the colors
 */
const colors = Array.from(document.getElementsByClassName("btnContainer"));
colors.forEach((div) => {
    div.addEventListener("click", (e) => {
        if (gameBegin) {
            const color = e.target.id;
            getDivColor(color).style.backgroundColor = getBackgroundColor(color)
            setTimeout(() => getDivColor(color).style.backgroundColor = "", 800)
            userSequence.push(color);
            setTimeout(1000);
            if (userSequence[userSequence.length - 1] !== currentSequence[userSequence.length - 1]) {
                alert("Wrong sequence! Game over.");
                gameBegin = false;
                userSequence = [];
                score = 0;
                startButton.textContent = "Restart";
                startButton.style.display = "block";
            } else if (userSequence.length === currentSequence.length) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                setTimeout(function(){
                    userSequence = [];
                    currentSequence = generateSequence(currentSequence);
                    displaySequence(currentSequence);
                }, 2500);
            }
        }
    });
});
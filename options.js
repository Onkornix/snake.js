let options = {}

let defaults = {
    intervalRate: 100,
    upKey: "w",
    downKey: "s",
    leftKey: "a",
    rightKey: "d",
    snakeColors: ["#469e4c", "#4aaa51"],
    groundColors: ["#161717", "#272929"],
    maxApples: 1,
    startingSnakeSize: 2,
}

function setDefaults() {
    options = {
        intervalRate: defaults.intervalRate,
        upKey: defaults.upKey,
        downKey: defaults.downKey,
        leftKey: defaults.leftKey,
        rightKey: defaults.rightKey,
        snakeColors: defaults.snakeColors,
        groundColors: defaults.groundColors,
        maxApples: defaults.maxApples,
        startingSnakeSize: defaults.startingSnakeSize,
}
}
   

function getOptions() {
    console.log(options)

    let speed = document.getElementById("snakeSpeed").value + (-200)

    let snakeColor1 = document.getElementById("snakeColor1").value
    let snakeColor2 = document.getElementById("snakeColor2").value

    let groundColor1 = document.getElementById("groundColor1").value
    let groundColor2 = document.getElementById("groundColor2").value

    let maxApples = document.getElementById("maxApples").value

    let startingSnakeSize = document.getElementById("startingSnakeSize").value
    
    
    options.intervalRate = speed
    options.snakeColors = [snakeColor1,snakeColor2]
    options.groundColors = [groundColor1, groundColor2]
    options.maxApples = maxApples
    options.startingSnakeSize = startingSnakeSize

    console.log(options)
}

const button = document.getElementById("submitOptions")
button.addEventListener("click", getOptions)

setDefaults()

const ctx = document.getElementById("awesomeCanvas").getContext("2d")
ctx.canvas.height = 900
ctx.canvas.width = 900

const deathSound = new Audio()
deathSound.src = "resources/deathsound.mp3"
const deathMessage =  document.getElementById("you-died-fade");

let body = [[]]

let currentDirection 
let dirChangeQueue

let apple
let applePos

let alive = false
let score
let applesSinceSpawn
let spawnRequirement =  Math.round((Math.random() * (7 - 3) + 3))


let intervalID = 0

let obstacles = [[]]

function theFunctionINeededThatPutsEverythingBackToNormalSoThatThePlayerCanStartANewGame() {
    body = [[30,30],[60,30]]

    currentDirection = "right"
    dirChangeQueue = []
    
    apple = false
    applePos = [-30,-30]

    alive = false
    
    score = 0
    applesSinceSpawn = 0
    deathMessage.style = "opacity: 0"

    obstacles = [[]]
}
function start() {
    theFunctionINeededThatPutsEverythingBackToNormalSoThatThePlayerCanStartANewGame()
    
    body = [[30,30],[60,30]]

    currentDirection = "right"
    dirChangeQueue = []
    
    apple = false
    applePos = [-30,-30]
    alive = true
    
    score = 0
    console.log("start")

    draw()
    intervalID = setInterval(frame, 100)
}
function draw() {
    ctx.clearRect(0,0,900,900) 
    let y = 0
    let x = 0
    let groundColors = ["#161717", "#272929"]
    let groundIndex = 0

    for (y; y <= 900; y += 30) {
        for (x; x <= 900; x += 30) {
            ctx.fillStyle = groundColors[groundIndex % 2]
            ctx.fillRect(x, y, 30, 30)
            groundIndex++
        }
        x = 0
    }

    let currentBodyPart = 0

    let snakeColors = ["#469e4c", "#4aaa51", "#4eb555", "#4aaa51"]
    let colorIndex = 0

    while (currentBodyPart <= body.length - 1 ) {
        ctx.fillStyle = snakeColors[colorIndex % 4]
        ctx.fillRect(body[currentBodyPart][0],body[currentBodyPart][1],30,30)

        currentBodyPart += 1
        colorIndex++
    }

    ctx.fillStyle = "#ab3434"
    ctx.fillRect(applePos[0],applePos[1],30,30)

    ctx.fillStyle = "#ceced0"
    for (i in obstacles) {
        ctx.fillRect(obstacles[i][0],obstacles[i][1],30,30)
    }

    // ctx.fillStyle = "white"
    // ctx.font = "bold 46px Impact";
    // ctx.fillText(score,450,60)
}
function elongate() {
    let end = body.length - 1
    let bodycopy = body
    let newBodyPart
        switch (currentDirection) {
            case "down":
                newBodyPart = [body[end][0], body[end][1]+30]
                break;
            case "left":
                newBodyPart = [body[end][0]-30, body[end][1]]
                break;
            case "right":
                newBodyPart = [body[end][0]+30, body[end][1]]
                break;
            case "up":
                newBodyPart = [body[end][0], body[end][1]-30]
                break;
            default:
                break;
        }
    body = []

    body.push(newBodyPart)

    for (i in bodycopy) {
        body.push(bodycopy[i])
    }

    score++

}
function move() {    
    let newPart
    let i = body.length - 1
    let bodyCopy = body

    if (dirChangeQueue.length >= 1) {
        let reqChange = dirChangeQueue.shift()

        if ((reqChange == "up" && currentDirection == "down")
        || (reqChange == "down" && currentDirection == "up")
        || (reqChange == "left" && currentDirection == "right")
        || (reqChange == "right" && currentDirection == "left")) {
            return
        }
        if (reqChange != currentDirection) {
            currentDirection = reqChange
        }
        
    }
    
    switch (currentDirection) {
        case "down":
            newPart = [body[i][0],body[i][1]+30]
            break;
        case "left":
            newPart = [body[i][0]-30,body[i][1]]
            break;
        case "right":
            newPart = [body[i][0]+30,body[i][1]]
            break;
        case "up":
            newPart = [body[i][0],body[i][1]-30]
            break;
        default:
            break;
    }


    body = []

    for (let ii = 1; ii <= i; ii++) {
        body.push(bodyCopy[ii])
    }

    body.push(newPart)


}
function spawnApple() {
    let appleX = Math.round((Math.random() * (29 - 1) + 1)) * 30;
    let appleY = Math.round((Math.random() * (29 - 1) + 1)) * 30;

    apple = true
    applePos = [appleX, appleY]

    for (i in body) {
        if (listsAreEqual(applePos, body[i])) {
            spawnApple()
        }
    }
    for (i in obstacles) {
        if (listsAreEqual(applePos, obstacles[i])) {
            spawnApple()
        }
    }

}
function collision() {
    let headPos = body[body.length - 1]
    let b = []

    for (let i = 0; i <= body.length - 2; i++) {
        b.push(body[i])
    }


    if (headPos[0] > 900 || 
        headPos[0] < 0   ||
        headPos[1] > 900 ||
        headPos[1] < 0) {            
            return true

        }


    for (let i = 0; i < b.length - 1; i++) {
        if (listsAreEqual(b[i], headPos)) {
                return true
            }
    }
    
    for (i in obstacles) {
        if (listsAreEqual(headPos, obstacles[i])) {
            return true
        }
    }

    return false

}
function spawnObstacle() {

    let nonSpawnableBlocks = [[]]
    let spawnableBlocks = [[]] 

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            nonSpawnableBlocks.push([body[0][0]+(i*30)],body[0][1]+(j*30))
        }
    }

    for (i in body) {
        nonSpawnableBlocks.push(body[i])
    }

    for (i in obstacles) {
        nonSpawnableBlocks.push(obstacles[i])
    }

    nonSpawnableBlocks.push(applePos)

    for (let x = 0; x <= 900; x += 30) {
        for (let y = 0; y <= 900; y += 30) {
            let spawnable = true
            if (nonSpawnableBlocks.find(
                (element) => listsAreEqual(element, [x,y])
            ) != undefined) {
                spawnable = false
            }
            if (spawnable == true){
                spawnableBlocks.push([x,y])
            }
        }
    }

    let obstacle = spawnableBlocks[Math.round((Math.random() * (spawnableBlocks.length - 1)))]
    console.log(spawnableBlocks)
    console.log(nonSpawnableBlocks)
    obstacles.push(obstacle)
}
function end() {


    deathSound.play()
    deathMessage.animate([
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      2000)
      deathMessage.style = "opacity: 1"
}
function frame(){

    if (apple == false) {
        spawnApple()
    }

    let headPos1 = body[body.length - 1]

    if (listsAreEqual(headPos1, applePos)) {
        elongate()
        apple = false
        applePos = [-30,-30]
        //console.log(spawnRequirement, applesSinceSpawn)
        

        if (applesSinceSpawn >= spawnRequirement) {
            for (let i = 0; i <= 20; i++) {
                // let success = false
                // while (success == false) {
                //     success = spawnObstacle()
                // }
                spawnObstacle()
            }
            applesSinceSpawn = 0
            spawnRequirement = Math.floor((Math.random() * (7 - 3) + 3))
        }

        applesSinceSpawn++

    }
    
    if (alive == true) {
        move()
    }
    

    if (collision() == true) {
        alive = false
        clearInterval(intervalID)
        end()
        return
    }

    draw()
}
function listsAreEqual(list1, list2) {
    if (list1[0] == list2[0] && list1[1] == list2[1]) {
        return true
    } else {
        return false
    }
}
window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "s":
            if (currentDirection == "up") {
                break;
            }
            dirChangeQueue.push("down")
            break;
        case "w":
            if (currentDirection == "down") {
                break;
            }
            dirChangeQueue.push("up")
            break;
        case "a":
            if (currentDirection == "right") {
                break;
            }
            dirChangeQueue.push("left")
            break;
        case "d":
            if (currentDirection == "left") {
                break;
            }
            dirChangeQueue.push("right")
            break;
        case "arrowdown":
            if (currentDirection == "up") {
                break;
            }
            dirChangeQueue.push("down")
            break;
        case "arrowup":
            if (currentDirection == "down") {
                break;
            }
            dirChangeQueue.push("up")
            break;
        case "arrowleft":
            if (currentDirection == "right") {
                break;
            }
            dirChangeQueue.push("left")
            break;
        case "arrowright":
            if (currentDirection == "left") {
                break;
            }
            dirChangeQueue.push("right")
            break;
        case "enter": 
            if (alive == true) {
                break
            } else {
                start()
            }
            break;
        default:
            //console.log(e.key.toLowerCase())
            break;
    }

})
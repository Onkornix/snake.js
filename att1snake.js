const ctx = document.getElementById("awesomeCanvas").getContext("2d")
ctx.canvas.height = 900
ctx.canvas.width = 900
let currentDirection = "down"

class Body {
    constructor(head) {
        this.length = 0
        this.head = head
        this.tail = head
    }
    drawBody(){
        let current = this.head


        while (current !== null) {
            //console.log(current.data, current.next)
            ctx.fillStyle = "green"
            ctx.fillRect(current.data[0],current.data[1],30,30)

            current = current.next
        }
    }
    
    elongate() {
        let newBodyPart
        switch (currentDirection) {
            case "down":
                newBodyPart = new BodyPart([this.head.data[0],this.head.data[1]+30])
                break;
            case "left":
                newBodyPart = new BodyPart([this.head.data[0]-30,this.head.data[1]])
                break;
            case "right":
                newBodyPart = new BodyPart([this.head.data[0]+30,this.head.data[1]])
                break;
            case "up":
                newBodyPart = new BodyPart([this.head.data[0],this.head.data[1]]-30)
                break;
            default:
                break;
        }
        newBodyPart.next = this.head
        this.head = newBodyPart
        
    }

    move() {
        switch (currentDirection) {
            case "down":
                let current = this.head
                let prevPos
                 while (current.next !== null) {
                    //console.log(current)
                    if (current == this.head) {
                        prevPos = current.data
                        //console.log(prevPos)
                        this.head.data = [this.head.data[0],this.head.data[1]+30]
                        current = current.next
                        continue
                    }
                    current.next.data = prevPos
                    prevPos = current.next.data

                    current = current.next
                    console.log(current.next)
                 } 

                break;
            case "left":
                
                break;
            case "right":
                
                break;
            case "up":
                
                break;
            default:
                break;
        }
    }

}

class BodyPart {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

let body = new Body(new BodyPart([30,30]))
body.elongate()
body.elongate()
body.elongate()
body.move()
body.drawBody()



window.addEventListener("keypress", (event) => {
    switch (event.key) {
        case "s":
            currentDirection = "down"
            break;
        case "w":
            currentDirection = "up"
            break;
        case "a":
            currentDirection = "left"
            break;
        case "d":
            currentDirection = "right"
            break;
        default:
            body.elongate
            break;
    }
})


// function drawBody() {
//     ctx.reset()
//     for (let i = 0; i < bodyParts.length; i++) {
//         ctx.fillStyle = "green"
//         ctx.fillRect(bodyParts[i][0],bodyParts[i][1],30,30)
//     }
// }

// function move(direction) {
//     if (direction == "down") {
//         let headPrevPos = bodyParts[0][1]
//         bodyParts[0][1] += 30
//         if (bodyParts.length > 1) {
//             bodyParts[bodyParts.length][1] = headPrevPos
//         }
//     }
// }

// function eat() {
//     bodyParts.push([[bodyParts.length][0],[bodyParts.length][1]+30])

// }


const WID = 1350
const HEI = 590
let map
let click

function setup() {
    createCanvas(WID, HEI)
    map = new Map(WID, HEI)
    click = new clickInterface()
    map.lines.push(new Line(100, 100, 300, 300))
    map.lines.push(new Line(300, 100, 100, 300))
}


function draw() {
    background(200)
    map.render()
    interface()
}


let st = { x: 0, y: 0, precalc: false }
let keepGoing = true
function interface() {
    if (keyIsPressed) {
        if (keyCode == ESCAPE) {
            keepGoing = false
            click.deactivate()
            st.precalc = false
        }
    }
    let interface = click.active()
    if (interface != -1) {
        if (interface == "start") {
            st.x = click.getStart().x
            st.y = click.getStart().y
            st.precalc = true
            keepGoing = true
        }
        if (interface == "end" && keepGoing) {
            map.newLine(click.getStart(), click.getEnd())
            click.reactivate()
            st.x = click.getStart().x
            st.y = click.getStart().y
        }
        if (interface == "end" && !keepGoing) {
            st.precalc = false
            map.newLine(click.getStart(), click.getEnd())
        }
    }
    if (st.precalc) {
        line(st.x, st.y, mouseX, mouseY)
    }
}


const clickInterface = function () {
    this.state = 0
    this.start = { x: undefined, y: undefined }
    this.end = { x: undefined, y: undefined }

    this.getStart = () => this.start
    this.getEnd = () => this.end

    this.reactivate = function () {
        this.state = 2
        this.start.x = mouseX
        this.start.y = mouseY
        return "start"
    }
    this.deactivate = function () {
        this.state = 0
    }

    this.active = function () {
        if (mouseIsPressed && this.state == 0) {
            this.state = 1
        }
        if (!mouseIsPressed && this.state == 1) {
            this.state = 2
            this.start.x = mouseX
            this.start.y = mouseY
            return "start"
        }

        if (mouseIsPressed && this.state == 2) {
            this.state = 3
        }
        if (!mouseIsPressed && this.state == 3) {
            this.state = 0
            this.end.x = mouseX
            this.end.y = mouseY
            return "end"
        }
        return -1
    }
}

const Map = function (wid, hei) {
    this.wid = wid
    this.hei = hei
    this.lines = []
    this.render = function () {
        this.lines.forEach(l => l.render())
    }
    this.newLine = function (start, end) {
        let linea = new Line(start, end)
        //let cross = this.lines.find((l,i) => l.intersect(linea) && i < this.lines.length-1)
        let cross
        for (let i = 1; i < this.lines.length ; i++) {
            if (this.lines[i].intersect(linea)) {
                cross = i
                console.log(i)
                break
            }
        }
        if (cross == undefined) {
            this.lines.unshift(linea)
        }
        else {
            //
            this.lines.unshift(linea)
            console.log("intersecc")
        }
    }
}

const Line = function (start, end) {
    this.start = { x: start.x, y: start.y }
    this.end = { x: end.x, y: end.y }

    this.getStart = () => this.start
    this.getEnd = () => this.end

    this.render = function () {
        line(this.start.x, this.start.y, this.end.x, this.end.y)
        circle(this.start.x, this.start.y, 10)
        //text(`ST.. x: ${this.start.x} y: ${this.start.y}`, this.start.x + 10, this.start.y)
        circle(this.end.x, this.end.y, 10)
        //text(`EN.. x: ${this.end.x} y: ${this.end.y}`, this.end.x + 10, this.end.y+ 10)
    }

    this.intersect = function (other) {
        let x1 = this.start.x
        let x2 = this.end.x
        let x3 = other.start.x
        let x4 = other.end.x

        let y1 = this.start.y
        let y2 = this.end.y
        let y3 = other.start.y
        let y4 = other.end.y

        let A = x1 - x3 + (x2 - x1) * ((y3 - y1) / (y2 - y1))
        let B = x4 - x3 - (x2 - x1) * ((y4 - y3) / (y2 - y1))

        if (B == 0) {
            return false
        }

        let S = A / B

        if (S >= 0 && S <= 1) {
            let x = x3 + S * (x4 - x3)
            let y = y3 + S * (y4 - y3)
            console.log(`x: ${x} y: ${y}`)
            fill(255,0,0)
            circle(x,y,50)
            fill(255)
            return true
        }
        return false
    }
}
let gameBoard = document.querySelector('.gameBoard')
let player

let game = {
    player: {
        startPosition: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        speed: 10,
        width: 40,
        height: 80,
        score: 0,
    },
    road: {
        mapBorderLeft: 0,
        mapBorderRight: 0,
        mapBorderTop: 0,
        mapBorderBottom: 0,
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
        width: 255,
    },
    cars: {
        spawnBorders: { x1: 0, x2: 0 },
        speed: 3,
        amountOfClasses: 3,
    }
}

//NASA rocket launching center
computeStartPositions()
spawnPlayer()
spawnCar()
setInterval(pushCars, 6)
window.addEventListener('keydown', function (event) { move(event) })

function pushCars() {
    let cars = document.querySelectorAll('.car')
    cars.forEach(car => { if (parseInt(car.style.top) <= game.road.borderBottom) { car.style.top = parseInt(car.style.top) + game.cars.speed + "px" } else { car.parentElement.removeChild(car); game.player.score++ } })
}

function spawnCar() {
    let car = document.createElement('div')
    let color = "car" + Math.round(Math.max(1, (Math.random() * game.cars.amountOfClasses)))
    car.classList.add('car')
    car.classList.add(color)
    let lORr = Math.random()
    if (lORr >= 0.5) { lORr = -1 } else { lORr = 1 }
    let place = lORr * Math.random() * game.road.width
    car.style.left = game.player.startPosition.x + place + "px"
    car.style.top = game.road.borderTop + "px"
    gameBoard.appendChild(car)
}

function drawPlayer() {
    player = document.querySelector('.playerNode')
    player.style.left = game.player.position.x + "px"
    player.style.top = game.player.position.y + "px"
}

function move(input) {
    let key = input.key
    if (key === "ArrowRight" && game.player.position.x < game.road.mapBorderRight - game.player.width) {
        game.player.position.x += game.player.speed
    }
    if (key === "ArrowLeft" && game.player.position.x > game.road.mapBorderLeft) {
        game.player.position.x -= game.player.speed
    }
    if (key === "ArrowUp" && game.player.position.y > game.road.mapBorderTop) {
        game.player.position.y -= game.player.speed
    }
    if (key === "ArrowDown" && game.player.position.y < game.road.borderBottom) {
        game.player.position.y += game.player.speed
    }
    drawPlayer()
}

function spawnPlayer() {
    player = document.createElement('div')
    player.classList.add('playerNode')
    player.style.left = game.player.startPosition.x + "px"
    player.style.top = game.player.startPosition.y + "px"
    gameBoard.appendChild(player)
}

function computeStartPositions() {
    let leftMargin = gameBoard.offsetLeft
    let middleOfTheMapX = gameBoard.clientWidth / 2
    game.road.mapBorderLeft = leftMargin
    game.road.mapBorderRight = leftMargin + gameBoard.clientWidth
    game.road.mapBorderTop = gameBoard.offsetTop
    game.road.mapBorderBottom = gameBoard.offsetTop + gameBoard.clientHeight
    game.player.startPosition.x = leftMargin + middleOfTheMapX - game.player.width / 2
    game.player.startPosition.y = gameBoard.offsetTop + gameBoard.clientHeight - game.player.height
    game.road.borderBottom = game.player.startPosition.y
    game.player.position.x = game.player.startPosition.x
    game.player.position.y = game.player.startPosition.y
}
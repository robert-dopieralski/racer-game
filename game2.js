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
        warnings: 0,
    },
    road: {
        leftBorder: 710,
        rightBorder: 1240,
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
        maxCarsOnMap: 10,
    }
}

//NASA rocket launching center
computeStartPositions()
spawnPlayer()
spawnCar()
let moveCars = setInterval(pushCars, 500)
let newCars = setInterval(spawnCar, 5000)
window.addEventListener('keydown', function (event) { move(event) })

function detectCollision() {
    let cars = document.querySelectorAll('.car')
    cars.forEach(car => {
        let positionX = parseInt(car.style.left)
        let positionY = parseInt(car.style.top)
        console.log(positionX + " " + positionY)
        console.log(game.player.position)
        console.log(Math.abs(positionX - game.player.position.x) + " < " + game.player.width)
        if ((Math.abs(positionX - game.player.position.x)) < game.player.width && positionY >= (game.player.position.y - game.player.height)) { gameOver() }
    })
}

function gameOver() {
    clearInterval(newCars)
    clearInterval(moveCars)
    player = document.querySelector('.playerNode')
    player.parentElement.removeChild(player)
}

function checkIfPlayerIsOnTheRoad() {
    if (game.player.position.x > game.road.rightBorder || game.player.position.x < game.road.leftBorder) {
        if (game.player.warnings === 3) {
            gameOver()
        }
        game.player.warnings++
        alert("This is " + game.player.warnings + " warning that You are getting off the road. After 3rd warning game is over!")
        if (game.player.warnings === 4) {
            gameOver()
        }
    }
}

function pushCars() {
    let cars = document.querySelectorAll('.car')
    cars.forEach(car => { if (parseInt(car.style.top) <= game.road.borderBottom) { car.style.top = parseInt(car.style.top) + game.cars.speed + "px"; detectCollision() } else { car.parentElement.removeChild(car); game.player.score++ } })
}

function spawnCar() {
    let cars = document.querySelectorAll('.car')
    if (cars.length < game.cars.maxCarsOnMap) {
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
}

function drawPlayer() {
    player = document.querySelector('.playerNode')
    if (player !== null) {
        player.style.left = game.player.position.x + "px"
        player.style.top = game.player.position.y + "px"
        console.log(game.player.position.x)
        checkIfPlayerIsOnTheRoad()
    }
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
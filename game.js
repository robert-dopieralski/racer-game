let gameBoard = document.querySelector('.gameBoard')
//tutaj trzeba poprawic to co jest wyzej
let player
let inter
let carInterval
let offRoadCheck
let moveCarsInterval
let warnings = 0

let game = {
    player: {
        startPosition: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        playerSize: { x: 50, y: 80 },
        borderBottom: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        xSpeed: 14,
        ySpeed: 10,
    },
    road: {
        borderLeft: 130,
        borderRight: 665,
    },
    cars: {
        xSpeed: 9
    }

}


//NASA rocket launching center
spawnPlayer()
window.addEventListener('keydown', function (event) { move(event) })
inter = setInterval(drawCar, 16)
offRoadCheck = setInterval(checkIfOffTheRoad, 1500)
// carInterval = setInterval(spawnCar, 1000)
// moveCarsInterval = setInterval(moveCars, 30)

function enemySpawnPosition() {
    let middle = (game.road.borderRight - game.road.borderLeft) / 2
    let lORr = Math.random()
    if (lORr >= 0.5) {
        lORr = -1
    }
    else {
        lORr = 1
    }
    let dist = Math.random() * middle
    let spawnPos = middle + lORr * dist
    if (spawnPos >= game.road.borderRight || spawnPos <= game.road.borderLeft) {
        enemySpawnPosition()
    }
    else {
        return spawnPos
    }

}

function moveCars() {
    let cars = document.querySelectorAll('.car')
    cars.forEach(car => {
        if ((parseInt(car.style.top) + 90) > game.player.borderBottom) {
            //- 90 cuz height is 90 px in CSS file
            car.parentElement.removeChild(car)
        }
        else {
            car.style.top = parseInt(car.style.top) + game.cars.xSpeed + "px"
        }
    })
}

function spawnCar() {
    let car = document.createElement('span')
    let color = "car" + Math.round(Math.max(1, (Math.random() * 3)))
    car.classList.add('car')
    car.classList.add(color)
    car.style.left = enemySpawnPosition() + "px"
    car.style.top = 0 + "px"
    gameBoard.appendChild(car)
}

function checkIfOffTheRoad() {
    if (game.player.position.x < game.road.borderLeft || game.player.position.x > game.road.borderRight) {
        warnings++
        alert('You Are Off The Road, This is: ' + warnings + ". After 3rd warning game is over m8")
    }
}

function drawCar() {
    player.style.top = game.player.position.y + "px"
    player.style.left = game.player.position.x + "px"
}

function move(input) {
    console.log(game.player.position)
    let key = input.key
    if (key === "ArrowRight" && game.player.position.x < game.player.borderRight) {
        game.player.position.x += game.player.xSpeed
    }
    if (key === "ArrowLeft" && game.player.position.x > game.player.borderLeft) {
        game.player.position.x -= game.player.xSpeed
    }
    if (key === "ArrowUp" && game.player.position.y > game.player.borderTop) {
        game.player.position.y -= game.player.ySpeed
    }
    if (key === "ArrowDown" && game.player.position.y < game.player.borderBottom) {
        game.player.position.y += game.player.ySpeed
    }
}

function setInitialSettingsAndBorders() {
    game.player.position.y = parseInt(player.style.top)
    game.player.position.x = parseInt(player.style.left)
    game.player.borderBottom = game.player.position.y
    game.player.borderLeft = (game.player.playerSize.x * 1.2 - game.player.playerSize.x)
    game.player.borderRight = gameBoard.clientWidth - game.player.playerSize.x * 1.2
}

function spawnPlayer() {
    game.player.startPosition.y = parseInt(gameBoard.clientHeight) - game.player.playerSize.y
    game.player.startPosition.x = gameBoard.clientWidth / 2 - game.player.playerSize.x / 2
    player = document.createElement('div')
    player.classList.add('playerNode')
    gameBoard.appendChild(player)
    player.style.width = game.player.playerSize.x + "px"
    player.style.height = game.player.playerSize.y + "px"
    player.style.top = game.player.startPosition.y + "px"
    player.style.left = game.player.startPosition.x + "px"
    setInitialSettingsAndBorders()
}
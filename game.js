let gameBoard = document.querySelector('.gameBoard')
gameBoard.style.height = window.innerHeight - 100 + "px"
//tutaj trzeba poprawic to co jest wyzej
let player
let inter

let game = {
    player: {
        startPosition: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        playerSize: { x: 50, y: 120 },
        borderBottom: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        xSpeed: 14,
        ySpeed: 10,
    }
}

spawnPlayer()
window.addEventListener('keydown', function (event) { move(event) })
inter = setInterval(draw, 16)

function draw() {
    player.style.top = game.player.position.y + "px"
    player.style.left = game.player.position.x + "px"
}

function move(input) {
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
    // console.log(input.key)
    // console.log(game.player.position)
}

function setInitialSettingsAndBorders() {
    game.player.position.y = parseInt(player.style.top)
    game.player.position.x = parseInt(player.style.left)
    game.player.borderBottom = game.player.position.y
    game.player.borderTop = (game.player.playerSize.x*1.2 - game.player.playerSize.x)
    game.player.borderLeft = (game.player.playerSize.x*1.2 - game.player.playerSize.x)
    game.player.borderRight = gameBoard.clientWidth - game.player.playerSize.x*1.2
}

function spawnPlayer() {
    game.player.startPosition.y = parseInt(gameBoard.style.height) - game.player.playerSize.y
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
// Propriétés de la balle
let ball = document.getElementById('ball');
let ballSpeed = 5;
let ballXDir = ballSpeed;
let ballYDir = ballSpeed;
let ballXPos = 70;
let ballYPos = 240;
let ballWidth = 40;
let ballHeight = 40;
let ballStickied = "P1"; // null if not sitckied, P1/P2 if stickied

//Propriétés de la balle 
let raquette1 = document.getElementById('j1');
let raquette2 = document.getElementById('j2');
let raquette1Y = 210;
let raquette2Y = 210;
let raquetteSpeed = 25;
let raquetteLength = 100;

// Propriété de la table
let border = 5
let cadreTop = document.getElementById('cadre').offsetTop + border;
let cadreBottom = document.getElementById('cadre').offsetHeight + border;
let cadreLeft = document.getElementById('cadre').offsetLeft + border;
let cadreRight = document.getElementById('cadre').offsetWidth + border;

let raquetteYLimitBottom = document.getElementById('cadre').offsetHeight - raquetteLength / 2 - border;
let raquetteYLimitTop = document.getElementById('cadre').offsetTop + border;

var gamestarted = false;
var gameended = false;
var scoreJ1 = 0;
var scoreJ2 = 0;

let partieId;

function start() {
    gamestarted = true;
    ballStickied = null;
    partieId = setInterval(moveBall, 1000 / 90);
    document.getElementById('whowon').innerHTML = ('Fight !')

}

function stop() {
    gamestarted = false;
    clearInterval(partieId)
    partieId = null
}

function player1Won() {
    updateScore("P1");
    if (!gameended) {
        ballStickied = "P2"
        stop()
        document.getElementById('whowon').innerHTML = ('Player 1 won !')
        setTimeout(initRound, 1000)
    }
}
function player2Won() {
    updateScore("P2");
    if (!gameended) {
        ballStickied = "P1"
        stop()
        document.getElementById('whowon').innerHTML = ('Player 2 won !')
        setTimeout(initRound, 1000)
    }
}

function initRound() {
    moveStickyBall()
    document.getElementById('whowon').innerHTML = ('Press space to begin !')

}

function updateScore(winnerName) {
    console.debug("update score, winner is", winnerName)
    if (winnerName === "P2") {
        scoreJ2 += 1;

    } else if (winnerName === "P1") {
        scoreJ1 += 1;
    }

    if (scoreJ1 >= 5 && ((scoreJ1 - scoreJ2) >= 2)) {
        document.getElementById('score').innerHTML = `Congratulations J1`
        document.getElementById('whowon').innerHTML = ''
        gameended = true

    } else if (scoreJ2 >= 5 && ((scoreJ2 - scoreJ1) >= 2)) {
        document.getElementById('score').innerHTML = `Congratulations J2`
        document.getElementById('whowon').innerHTML = ''
        gameended = true

    } else {
        document.getElementById('score').innerHTML = `${scoreJ1} : ${scoreJ2}`
    }


}

function setObjectPosition(object, x, y) {
    if (x != null) {
        object.style.left = x + 'px';
    }

    if (y != null) {
        object.style.top = y + 'px';
    }
}

function moveStickyBall() {
    if (ballStickied === "P1") {
        ballYPos = raquette1Y + raquetteLength / 2 - ballHeight / 2
        setObjectPosition(ball, 70, ballYPos)

    } else if (ballStickied === "P2") {
        ballYPos = raquette2Y + raquetteLength / 2 - ballHeight / 2
        setObjectPosition(ball, cadreRight - 15, ballYPos)
    }
}

function moveRacket1(direction) {
    let newPosition

    if (direction === "up") {
        newPosition = raquette1Y - raquetteSpeed
    } else if (direction === "down") {
        newPosition = raquette1Y + raquetteSpeed
    } else {
        console.error("invalid racket movement direction=", direction)
    }

    if (raquetteYLimitBottom < newPosition) {
        newPosition = raquetteYLimitBottom
    } else if (raquetteYLimitTop > newPosition) {
        newPosition = raquetteYLimitTop
    }

    raquette1Y = newPosition
    setObjectPosition(raquette1, null, newPosition)
    moveStickyBall()
}

function moveRacket2(direction) {
    let newPosition

    if (direction === "up") {
        newPosition = raquette2Y - raquetteSpeed
    } else if (direction === "down") {
        newPosition = raquette2Y + raquetteSpeed
    } else {
        console.error("invalid racket movement direction=", direction)
    }

    if (raquetteYLimitBottom < newPosition) {
        newPosition = raquetteYLimitBottom
    } else if (raquetteYLimitTop > newPosition) {
        newPosition = raquetteYLimitTop
    }

    raquette2Y = newPosition
    setObjectPosition(raquette2, null, newPosition)
    moveStickyBall()
}

function moveBall() {
    let newBallXPos = ballXPos + ballXDir;
    let newBallYPos = ballYPos + ballYDir;

    if (newBallXPos > cadreRight && newBallYPos > raquette2Y && newBallYPos < (raquette2Y + raquetteLength)) { // TODO add raquette offset
        console.info("touched J2 raquette")
        ballXDir = -Math.abs(ballXDir);
    } else if (newBallXPos > cadreRight) {
        console.info("touched left wall = J1 Won")
        player1Won()
        return;
    }
    else if (newBallYPos > cadreBottom) {
        console.info("touched bottom wall")
        ballYDir = -Math.abs(ballYDir);
    }
    else if (newBallXPos < cadreLeft && newBallYPos > raquette1Y && newBallYPos < (raquette1Y + raquetteLength)) { // TODO add raquette offset
        console.info("touched J1 raquette")
        ballXDir = Math.abs(ballXDir);
    } else if (newBallXPos < cadreLeft) {
        console.info("touched left wall = J2 Won")
        player2Won()
        return;
    }
    else if (newBallYPos < cadreTop) {
        console.info("touched top wall")
        ballYDir = Math.abs(ballYDir);
    }

    //console.log(ballXPos, ballYPos, newBallXPos, newBallYPos);
    ballXPos = newBallXPos;
    ballYPos = newBallYPos;

    setObjectPosition(ball, ballXPos, ballYPos)
}

function init() {
    moveStickyBall()
    setObjectPosition(raquette1, null, raquette1Y)
    setObjectPosition(raquette2, null, raquette2Y)

    document.addEventListener('keydown', (event) => {
        console.debug("Pressed code=", event.code, " key=", event.key);
        switch (event.code) {
            case 'KeyQ':
                moveRacket1("up")
                if (event.altKey) {
                    moveRacket1("up")
                }
                break;
            case 'KeyA':
                moveRacket1("down")
                if (event.altKey) {
                    moveRacket1("down")
                }
                break;
            case 'KeyP':
                moveRacket2("up")
                if (event.shiftKey) {
                    moveRacket2("up")
                }
                break;
            case 'Semicolon':
                moveRacket2("down")
                if (event.shiftKey) {
                    moveRacket2("down")
                }
                break;

            case "Space":
                if (!partieId) {
                    document.getElementById("infos").style.display = "none"
                    start()
                    event.preventDefault()
                }
                break;
            default:
                break;
        }
    });
}
init();
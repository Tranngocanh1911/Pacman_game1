// Code to draw map start here
// 1 = <div class="wall"></div>
// 2 = <div class="coin"></div>
// 3 = <div class="ground"></div>
// 5 = <div class="pacman"></div>
// 6 = <div class="ghostpink"></div>
// 7 = <div class="ghostred"></div>

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 3, 1],
    [1, 2, 1, 2, 2, 2, 1, 3, 1, 2, 1, 3, 1, 2, 1, 1, 3, 3, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 3, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 3, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
    [1, 3, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
    [1, 3, 1, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [1, 3, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],


]
let pacman = {
    x: 8,
    y: 7
}

let play = document.getElementById('theGame')

function drawMap() {
    document.getElementById('gameMenu').innerHTML = '';
    play.innerHTML = '';
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            youWin();
            if (map[y][x] === 1) {
                play.innerHTML += '<div class="wall"></div>';
            } else if (map[y][x] === 2) {
                play.innerHTML += '<div class="coin"></div>';
            } else if (map[y][x] === 3) {
                play.innerHTML += '<div class="ground"></div>';
            } else if (map[y][x] === 5) {
                play.innerHTML += '<div id="pm" class="pacman"></div>';
            } else if (map[y][x] === 6) {
                play.innerHTML += '<div class="Pinky"></div>';
            } else if (map[y][x] === 7) {
                play.innerHTML += '<div class="Blinky"></div>';
            }
        }
        play.innerHTML += '<br>';
    }
}
// End code to draw map


// Code to move Pacman and add score start here
let score = 0

document.onkeydown = function (e) {
    if (e.keyCode === 37) {
        // left
        if (map[pacman.y][pacman.x - 1] !== 1 ) {
            map[pacman.y][pacman.x] = 3;
            score += 10
            pacman.x--;
            map[pacman.y][pacman.x] = 5;
            drawMap();
            pacmanEatSound()
            rotatePacmanLeft()

        }
    } else if (e.keyCode === 38) {
        // up
        if (map[pacman.y - 1][pacman.x] !== 1 ) {
            map[pacman.y][pacman.x] = 3;
            score += 10
            pacman.y--;
            map[pacman.y][pacman.x] = 5;
            drawMap();
            pacmanEatSound()
            rotatePacmanUp()
        }

    } else if (e.keyCode === 39) {
        // right
        if (map[pacman.y][pacman.x + 1] !== 1 ) {
            map[pacman.y][pacman.x] = 3;
            score += 10
            pacman.x++;
            map[pacman.y][pacman.x] = 5;
            drawMap();
            pacmanEatSound()
        }
    } else if (e.keyCode === 40) {
        //down
        if (map[pacman.y + 1][pacman.x] !== 1) {
            map[pacman.y][pacman.x] = 3;
            score += 10
            pacman.y++;
            map[pacman.y][pacman.x] = 5;
            drawMap();
            pacmanEatSound()
            rotatePacmanDown();
        }
    }

}

function rotatePacmanDown() {
    document.getElementById('pm').style.transform = 'rotate(90deg)'
}

function rotatePacmanLeft() {
    document.getElementById('pm').style.transform = 'rotate(180deg)'
}

function rotatePacmanUp() {
    document.getElementById('pm').style.transform = 'rotate(270deg)'
}

// End code to move Pacman and add score

// Code to move ghosts start here
let ghostScore = 0
let PinkyX = 1;
let PinkyY = 1;
let countx = 1;
let county = 1;

function movePinky() {
    if (PinkyY === 1) {
        countx = 0;
        county = 1;
    }
    if (PinkyY === 17) {
        countx = 1;
        county = 0;
    }
    if (PinkyX === 8) {
        countx = 0;
        county = -1
    }
    if (PinkyY <= 17) {
        if (PinkyX <= 8) {
            map[PinkyX][PinkyY] = 3
            map[PinkyX += countx][PinkyY += county] = 6;
            ghostScore += 10
            map[8][0] = 3;
            move()
        }
    }
    gameOver();
}
// Pinky = ghostPink
let BlinkyX = 13;
let BlinkyY = 17;
let count2x = 1;
let count2y = 0;

function moveBlinky() {
    if (BlinkyY === 17) {
        count2x = 0;
        count2y = 1;
    }
    if (BlinkyY === 1) {
        count2x = 1;
        count2y = 0;
    }
    if (BlinkyX === 6) {
        count2x = 0;
        count2y = -1;
    }
     if (BlinkyY >= 1) {
        if (BlinkyX >= 6) {
            if (BlinkyY <= 17) {
                map[BlinkyX][BlinkyY] = 3;
                map[BlinkyX -= count2x][BlinkyY -= count2y] = 7;
                ghostScore += 10
                map[6][18] = 3;
                move()
            }

        }
    }
    gameOver();
}
// Blinky = ghostRed
function stopInterval() {
    let a = setInterval(movePinky, 1000)
    let b = setInterval(moveBlinky, 1000)
    clearInterval(a)
    clearInterval(b)
}

// End code to move ghosts

// Function end game(lose/win)
function gameOver() {
    if (ghostScore >= 1000) {
        play.innerHTML = ''
        stopInterval();
        pacmanDeath();
        alert('Game over!');
    }
}

function youWin() {
    let flag = false;
    for (let i = 0; i < map.length; i++) {
        if(map[i].includes(2)){
            flag = true;
            stopInterval();
        }
    }
    if(!flag) {
        alert('You win!Your score is: ' + score);
    }
}
// End functions to end game

// Music
let music = document.getElementById('bgMusic');
function playMusic() {
    music.play();
}

let eat = document.getElementById('pacmanEat');
function pacmanEatSound(){
    eat.play()
}

let death = document.getElementById('pacmanDeath')
function pacmanDeath() {
    death.play()
}

// change button color
function changeColor() {
    document.getElementsByClassName('btn1')[0].style.color = 'deeppink'
    document.getElementsByClassName('btn1')[0].style.background = 'purple'
}

function originColor() {
    document.getElementsByClassName('btn1')[0].style.color = 'yellow'
    document.getElementsByClassName('btn1')[0].style.background = 'darkslateblue'
}






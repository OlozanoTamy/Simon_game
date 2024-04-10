let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let started = false
let level = 0

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

$(document).on("keydown", function () {
    if (!started) {
        nextSecuence();
        $(`#level-title`).text(`Level 1`)
        started = true
    } else {
        nextSecuence();
    }
})

function nextSecuence() {
    userClickedPattern = [];
    $(`#level-title`).text(`Level ${level}`)
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play();
}

function animatedPress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("exito")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSecuence();
            }, 1000)
        }
    } else {


        console.log("wrong");
        let wrong = new Audio(`./sounds/wrong.mp3`)
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function startOver() {
    level = 0;
    userClickedPattern = [];
    started = false
}
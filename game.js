//Array with the button colors
var buttonColours = ["red", "blue", "green", "yellow"];
//An empty array to store the color pattern
var gamePattern = [];
//An empty array to store the user clicks pattern
var userClickedPattern = [];
//This var stores the actual level where the player at
var level = 0;
//This var stores the state of the game (true -> strated, false -> not started)
var started = false;

$(document).on("keypress", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];

    //Incrementation the level number
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    //Play animation
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    //Play sound
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//Play sound on click
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animation style
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
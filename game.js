var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$('button').click(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
    $('button').hide();
})

$(document).keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
    $('button').hide();
})

$('.btn').on('click', function () {
    userColor(this.id);
    playSound(this.id);
    animatePress(this.id);
})

function nextSequence() {
    level++;
    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animateRandom(randomChosenColour);
    console.log(gamePattern)
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animateRandom(animateColour) {
    let randomColorId = '#' + animateColour;
    $(randomColorId).fadeOut(100).fadeIn(100);
}


function userColor(userChosenColour) {
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
}


function animatePress(currentColour) {
    let colorId = '#' + currentColour

    $(colorId).addClass('pressed')
    setTimeout(
        function () {
            $(colorId).removeClass('pressed');
        }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern.length === gamePattern.length) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log('success');
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        } else {
            console.log('wrong');
            playSound('wrong')
            $('body').addClass('game-over')
            setTimeout(
                function () {
                    $('body').removeClass('game-over');
                }, 1000);

            $('#level-title').text('Game Over, Press Any Key to Restart');
            startOver();
        }
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern=[];
    $('button').show();
}






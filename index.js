// Initial Setup
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let gameLevel = 0;
let gameRecord = 0;

// Start Game
$(document).on("keydown", function () {
  if (!started) {
    $("#continue").remove();
    nextSequence();
    started = true;
  }
});

// Game Sequence
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100, function () {
    $(this).fadeIn(100);
  });

  playSound(randomChosenColor);

  gameLevel++;
  $("#level-title").text("Level " + gameLevel);

  userClickedPattern = [];
}

// Button Sound
function playSound(button) {
  let buttonSound = new Audio("sounds/" + button + ".mp3");
  buttonSound.play();
}

// Player Actions
$(".btn").click(function () {
  let buttonID = $(this).attr("id");

  userClickedPattern.push(buttonID);

  $(this).addClass("pressed");
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 100);

  playSound(buttonID);

  let lastClickIndex = userClickedPattern.length - 1;
  checkAnswer(lastClickIndex);
});

// Compare user pattern against game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else if (userClickedPattern.length > gamePattern.length) {
    // Prevents throwing "game over" error before game starts
  } else {
    gameOver();
  }
}

// Game Over
function gameOver() {
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 300);

  $("#level-title").text("Game Over");
  $(".container").append("<h1 id='continue'>Press any key to continue</h1>");

  record(gameLevel - 1);

  gamePattern = [];
  started = false;
  gameLevel = 0;
}

// Game Record
function record(bestLevel) {
  if (bestLevel > gameRecord && bestLevel > 0) {
    $("#record").text("record: " + bestLevel);
    gameRecord = bestLevel;
  }
}

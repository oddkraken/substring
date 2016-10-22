var wordList;
var currentWord;
var hint;
var interval;

$(document).ready(function() {
  $.getJSON("assets/substringWords.json").done(function(json) {
    wordList = json;
    $('#start').prop('disabled', false);
  });

  $("#guess").keyup(function(event){
    if(event.keyCode == 13){
      submitGuess();
    }
  });
});

function startGame() {
  clearInterval(interval);
  getWord();
  //start timer
  var seconds = 60;
  $('#countdown').html(seconds);
  interval = setInterval(function() {
    $('#countdown').html(--seconds);
    if (seconds == 0) {
      console.log("Time's up!");
      clearInterval(interval);
    }
  }, 1000);
}

function getWord() {
  var index = Math.floor(Math.random()*wordList.length);
  currentWord = wordList[index];
  //hint starts at random letter between index 0 and currentWord.length - 4
  var hintStartIndex = Math.floor(Math.random()*(currentWord.length-3));
  hint = currentWord.substring(hintStartIndex, hintStartIndex+4);
  $('#hint').html(hint);
}

function submitGuess() {
  if (!currentWord) {
    return;
  }
  var guess = $('#guess').val();
  var guessContainsHint = guess.indexOf(hint) > -1;
  var guessIsWord = wordList.indexOf(guess) > -1;
  if (guessContainsHint && guessIsWord) {
    $('#results').append("<li>" + guess + "</li>");
  } else {
    var result;
    if (guess.length > 0) {
      result = guess + ", " + currentWord;
    } else {
      result = currentWord;
    }
    $('#results').append("<li>" + result + "</li>");
  }

  $('#guess').val("");
  getWord();
}

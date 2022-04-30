var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

function nextSequence(){
  var randomNumber=Math.floor(Math.random()*3)+1;
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);


  var myAudio=new Audio("sounds/"+randomChosenColor+".mp3");
  myAudio.play();
  level=level+1;
  $("h1").html("Level "+level);
}

function handler(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  var sound=new Audio("sounds/"+userChosenColor+".mp3");
  sound.play();
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
  },100);
}

$(".btn").on("click",handler);
$(document).on("keypress",function(){
  $("h1").html("Level 0");
  nextSequence();
});

function checkAnswer(currentLevel){
  var index=0;
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("success");
  console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){nextSequence();userClickedPattern=[];},1000);
    }
}


else{
  var wrong=new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
}

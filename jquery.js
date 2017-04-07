var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;   //used for setInterval


$(function(){
    
    //click on the start/reset button
    $("#startreset").click(function(){
        //if we are playing
        if(playing == true)    
        {
            //reload the page
            location.reload();
        }
        else   //if we are not plying
        {
            //change the playing status to "true", initiate the game
            playing = true; 
            
            //set the score to 0
            score = 0;
            $("#scorevalue").html(score);
            
            //show trials left box
            $("#trialsLeft").show();
            trialsLeft= 3;
            
            addHearts();   //append hearts to triallsLeft box
            
            //hide the game over box
            $("#gameOver").hide();
            
            //change button to "reset game"
            $("#startreset").html("Reset Game");
            
            //start sending fruits
            startAction();
        }
    });
});


//slice a fruit
$("#fruit1").mouseover(function(){
    //after slicing a fruit, the score should be added by 1
    score++;
    
    //then uodate the score value
    $("#scorevalue").html(score);
    
    //play the sound
    $("#slicesound")[0].play();
    
    //stop fruit and hide it 
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send a new fruit
    setTimeout(startAction, 500); 
    
});




//functions

function addHearts()
{
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++)
    {
        $("#trialsLeft").append('<img src = "images/Heart.png" class = "life">');
    }
}

//start sending fruits
function startAction()
{
    //generate a fruit
    $("#fruit1").show();
    
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step
    
    // Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        //move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height())
        {
            //check if we have trials left
            if(trialsLeft > 1 )
            {
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }
            else
            { // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);

}

//generate a random fruit
function chooseFruit()
{
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
}

//stop action
function stopAction()
{
    clearInterval(action);
    
    //then hide fruits
    $("#fruit1").hide();
}
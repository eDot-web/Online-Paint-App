$(document).ready(function(){
           var playing=false;
           var scored;
           var heart;
           var step;
           var counter;
           var newtop;
           var list=['apple.jpg','banana.jpg','cherry.png','Grapes.jpg','pear.png','pineapple.png','Watermelon.png'];
        $("#startreset").click(function(){
            if(playing==true){
                location.reload();
            }
            else{
                playing=true;
                score=0;
                heart=3;
        $("#startreset").html("Reset Game");
                $("#gameover").hide();
                $("#scores").html(score);
                trialsleft();
                drawfruit();
            }
            });
    $("#fru").mouseover(function(){
        score++;
        $("#slice")[0].play();
        clearInterval(counter);
        $("#scores").html(score);
        $("#fru").hide();
        drawfruit();
    });
    
    function trialsleft(){
        $("#lives").show();
        $("#lives").empty();
        for(i=0; i<heart; i++){
            $("#lives").append('<img src="images/heart.png" id="img">');
        }//heart loop end
    }//fn trialsleft end
    
    function drawfruit(){
        $("#fru").show();
        $("#fru").attr('src','images/'+ list[Math.round(6*Math.random())]);
       $("#fru").css({'left':Math.round(550*Math.random()),'top':'-50'});
        step=1+Math.round(5*Math.random());
        newtop=-50;
        counter=setInterval(function(){
            newtop+=step;
            $("#fru").css({'top':newtop});
            if($("#fru").position().top > $("#fruitboard").height()){
                if(heart>1){
                  $("#fru").show();
        $("#fru").attr('src','images/'+ list[Math.round(6*Math.random())]);
       $("#fru").css({'left':Math.round(550*Math.random()),'top':'-50'});
        step=1+Math.round(5*Math.random());
        newtop=-50; 
        heart--;
        trialsleft();
                }//check trials left if end
                else{
                    playing=false;
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                $("#stats").html(score);
                    $("#fru").hide();
                    $("#lives").hide();
                    clearInterval(counter);
                }
            }
        },10);
    }//fn drawfruit end
        });

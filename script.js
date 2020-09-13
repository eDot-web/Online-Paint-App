$(function(){
    $('#slider').slider({
        min:3,
        max:30,
        slide: function(event,ui){
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
        }
    });

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let paint = false;
    let mode = "paint";

    if(localStorage.getItem("saved")!=null){
        let img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = localStorage.getItem("saved");
    };

    function startDraw(e){
        paint = true;
        drawing(e);
    }

    function endDraw(){
        paint = false;
        ctx.beginPath();
    }

    function drawing(e){
        if(!paint) return
        ctx.lineWidth = $('#circle').width();
        if(mode == "paint") ctx.strokeStyle = document.getElementById('paintColor').value;
        else ctx.strokeStyle = "white";
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX-this.offsetLeft, e.clientY-this.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX-this.offsetLeft, e.clientY-this.offsetTop);
    }

    $('#paintColor').change(function(){
        $('#circle').css('background',$(this).val());
    });

    $('#erase').click(function(){
            if (mode == "paint") mode = "erase";
            else mode = "paint";
            $(this).toggleClass('eraseMode');
    });

    $('#save').click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("saved",canvas.toDataURL());
        }else{
        window.alert("Your browser does not support local storage");
        }
    });

    $('#reset').click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        $('#erase').removeClass('eraseMode');
        mode = "paint";
    });

    canvas.onmousedown = startDraw;
    canvas.onmouseup = endDraw;
    canvas.onmousemove = drawing;
    $('#container').mouseleave(()=>{paint = false;});
});
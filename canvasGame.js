$(document).ready(function(){
  let canvas = $('canvas')[0];
  let ctx = canvas.getContext('2d');
  var raf,score=0,dist, balls = [],bar,colors = ['red','green','orange','blue','pink','#f2451f','#5f98a2','#ff23ae','#2981ab','#33ac31'];
  function draw() {
      ctx.fillStyle = 'rgb(200,100,150)';
      ctx.fillRect(10,10,100,100);
      ctx.fillStyle = 'rgb(200,240,100)';
      ctx.strokeRect(50,50,100,50);
      ctx.clearRect(40,40,30,30);
      ctx.beginPath();
      for(var i=0; i<2000;i++){
        ctx.lineTo(Math.PI/1*i,(Math.sin(Math.PI/20*i)+1)*100);
      }
      ctx.stroke();
      ctx.beginPath();
      for(var i=0; i<2000;i++){
        ctx.lineTo(Math.PI/1*i,(Math.cos(Math.PI/20*i)+1)*100);
      }
      ctx.stroke();

}
// draw();
for(var j=0;j<5;j++){
  balls.push({
    id : j,
    x : Math.random()*(canvas.width),
    y : Math.random()*(canvas.height),
    xv : 10.5 ,
    yv : 10.5 ,
    radius : 30,
    color : colors[j%10],
    draw : function(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  })
}
  bar = {
    x : canvas.width/3,
    y : 0,
    color : 'gray',
    draw : function(){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,canvas.width/3,10);
      ctx.closePath();
      ctx.fill();
    }
  }
bar.draw();
function clearBar(){
  // console.log('clear');
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(0, 0, canvas.width, 10);
}
canvas.addEventListener('mousemove',function(e){
  clearBar();
  bar.xv = (e.clientX - canvas.width/6 - bar.x);
  bar.x = e.clientX - canvas.width/6;

  bar.draw();
})
function drawBall(){
  // ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(0, 10, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillText(score,20,20);
  ctx.fillText(balls.length,20,40);
  var xDistance,ydistance,tmp1,tmp2,collision = [];
  $.each(balls, function(index,ball){
    if(ball){
      score++;
      ball.x += ball.xv;
      ball.y += ball.yv;
      // ball.yv *= 0.999 ;
      // ball.xv *= 0.999 ;
      // ball.yv += 0.25 ;
      $.each(balls, function(index,ballOthers){
        if(collision.indexOf(ball.id) == -1){
          xDistance = ball.x - ballOthers.x;
          yDistance = ball.y - ballOthers.y;
          if(xDistance*xDistance + yDistance*yDistance <= 4*ball.radius*ball.radius && ball.id !== ballOthers.id ){
            console.log('collision',ball.color,ballOthers.color,xDistance,yDistance);
            collision.push(ballOthers.id);
            if(ball.xv*ballOthers.xv < 0){
              tmp1 = ball.xv;
              ball.xv = ballOthers.xv;
              ballOthers.xv = tmp1;
            }
            else{
              tmp1 = ball.xv;
              ball.xv = ballOthers.xv;
              ballOthers.xv = tmp1;
            }
            if(ball.yv*ballOthers.yv < 0){
              tmp2 = ball.yv;
              ball.yv = ballOthers.yv;
              ballOthers.yv = tmp2;
            }
            else if(ball.yv*ballOthers.yv > 0){
              tmp2 = ball.yv;
              ball.yv = ballOthers.yv;
              ballOthers.yv = tmp2;
            }
          }
        }
      });
      ball.draw();
      if(ball.x+ball.xv+ball.radius > canvas.width || ball.x+ball.xv -ball.radius < 0){
        ball.xv = -ball.xv;
      }
      if(ball.y+ball.yv +ball.radius>canvas.height || ball.y+ball.yv -ball.radius< 0){
        ball.yv = -ball.yv;
      }
      // console.log(ball.y,ball.yv);
      if(ball.y<= 45){
        // ball.xv = ball.xv-0.2;
        // ball.yv = ball.yv-0.2;
      }
      if(ball.y<= 40){
        // window.setTimeout(function(){
           dist = (ball.x - canvas.width/3);
          // for(var j=0;j< Math.abs(dist); j+=10){
            if(dist > 0){
              bar.x = dist;
            }
            else{
              bar.x = dist;
            }
            clearBar();
            bar.draw();
          // }
        // },0)

        // balls.splice(index,1);
      }
      if(ball.y<= 40 && !(bar.x<ball.x + 30 && (bar.x+canvas.width/3)>ball.x - 30)){
        balls.splice(index,1);
      }
      if(ball.y<= 45 && bar.x<ball.x && (bar.x+canvas.width/3)>ball.x){
        // bar.color = ball.color;
        ball.xv = ball.xv + bar.xv/10;
      }
      if(ball.y+ball.yv +ball.radius>= canvas.height-30){
        // balls.splice(index,1);
        // ball.xv = ball.xv +0.2;
        // ball.yv = ball.yv +0.2;
      }
    }

  })
  raf = window.requestAnimationFrame(drawBall);
}
canvas.addEventListener('mouseover', function(e){
  raf = window.requestAnimationFrame(drawBall);
})
canvas.addEventListener('mouseout', function(e){
  window.cancelAnimationFrame(raf);
})
$.each(balls, function(index,ball){
ball.draw();
});
});

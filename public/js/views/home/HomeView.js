define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $('#page'),

    render: function(){
   		this.$el.html(homeTemplate);
   		
   		// RequestAnimFrame: a browser API for getting smooth animations
   		window.requestAnimFrame = (function(){
   		    return  window.requestAnimationFrame       || 
   		        window.webkitRequestAnimationFrame || 
   		        window.mozRequestAnimationFrame    || 
   		        window.oRequestAnimationFrame      || 
   		        window.msRequestAnimationFrame     ||  
   		        function( callback ){
   		            return window.setTimeout(callback, 1000 / 60);
   		        };
   		})();
   		
   		window.cancelRequestAnimFrame = ( function() {
   		    return window.cancelAnimationFrame          ||
   		        window.webkitCancelRequestAnimationFrame    ||
   		        window.mozCancelRequestAnimationFrame       ||
   		        window.oCancelRequestAnimationFrame     ||
   		        window.msCancelRequestAnimationFrame        ||
   		        clearTimeout
   		} )();
   		
   		var canvas = document.getElementById("pong"),
   			ctx = canvas.getContext('2d'),
   			width = window.innerWidth,
   			height = window.innerHeight;
   			
   		//TODO: To be resized when with changes
   		canvas.width = width;
   		canvas.height = height;
   		
   		ctx.fillRect(0, 0, width, height);
   		
   		//TODO: Move to models
   		var particles = [],
   			ball = {},
   			paddles = [],
   			mouse = {};
   			
   		ball = {
   			x: 50,
   			y: 50,
   			r: 5,
   			c: 'white',
   			vx: 4,
   			vy: 8,
   			
   			draw: function(){
   				ctx.beginPath();
   				ctx.fillStyle = this.c;
   				ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
   				ctx.fill();
   			}
   		}
   		
   		function Paddle(pos){
   			this.h = 5;
   			this.w = 150;
   			this.x = width/2 - this.w/2;
   			this.y = (pos == 'top') ? 0 : height - this.h;
   		}
   		
   		paddles.push(new Paddle('bottom'));
   		paddles.push(new Paddle('top'));
   		
   		function paintCanvas(){
   			ctx.fillStyle = 'black';
   			ctx.fillRect(0, 0, width, height);
   		}
   		
   		//Draw everything on the canvas
   		function draw(){
   			paintCanvas();
   			for(var i = 0; i < paddles.length; i++){
   				p = paddles[i];
   				ctx.fillStyle = 'white';
   				ctx.fillRect(p.x, p.y, p.w, p.h);
   			}
   			
   			ball.draw();
   			update();
   		}
   		
   		// Function to run when the game overs
   		function gameOver() {
   		    ctx.fillStlye = 'white';
   		    ctx.font = '20px Arial, sans-serif';
   		    ctx.textAlign = 'center';
   		    ctx.textBaseline = 'middle';
   		    ctx.fillText('Game Over', width/2, height/2 + 25 );
   		    
   		    // Stop the Animation
   		    cancelRequestAnimFrame(init);
   		    
   		    // Set the over flag
   		    //over = 1;
   		    
   		    // Show the restart button
   			//restartBtn.draw();
   		}
   		
   		//Function for running the whole animation
   		function animloop(){
   			init = requestAnimFrame(animloop);
   			draw();
   		}
   		
   		animloop();
   		
   		function update(){
   			if(mouse.x && mouse.y){
   				for(var i = 0; i < paddles.length; i++){
   					p = paddles[i];
   					p.x = mouse.x - p.w/2;
   				}
   			}
   			
   			ball.x += ball.vx;
   			ball.y += ball.vy;
   			
   			p1 = paddles[0];
   			p2 = paddles[1];
   			
   			if(collides(ball, p1)){
   				ball.vy = -ball.vy;
   			}else if(collides(ball, p2)){
   				ball.vy = -ball.vy;
   			}else{
   				//Check collision
   				if(ball.y + ball.r > height){
   					ball.y = height - ball.r;
   					gameOver();
   				}else if(ball.y < 0){
   					ball.y = ball.r;
   					gameOver();
   				}
   				
   				//If the ball strikes the vertical walls, invert velocities
   				if(ball.x + ball.r > width){
   					ball.vx = -ball.vx;
   					ball.x = width - ball.r;
   				}else if(ball.x - ball.r < 0){
   					ball.vx = -ball.vx;
   					ball.x = ball.r;
   				}
   			}
   		}
   		
   		canvas.addEventListener('mousemove', trackPosition, true);
   		
   		function trackPosition(e) {
   			mouse.x = e.pageX;
   			mouse.y = e.pageY;
   		}
   		
   		function collides(b, p){
   			if(b.x + ball.r >= p.x && b.x - ball.r <= p.x + p.w){
   				if(b.y >= (p.y - p.h) && p.y > 0){
   					return true;
   				}else if(b.y <= p.h && p.y == 0){
   					return true;
   				}
   				
   				else return false;
   			}
   		}
    }
  });

  return HomeView;
  
});
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  '/js/views/Ball.js',
  '/js/views/Paddle.js'
], function($, _, Backbone, homeTemplate, BallView, PaddleView){

var HomeView = Backbone.View.extend({
    el: $('#page'),
    
    initialize: function(){
    	//RequestAnimFrame: a browser API for getting smooth animations
    	window.requestAnimFrame = (function(){
    	    return  window.requestAnimationFrame       || 
    	        window.webkitRequestAnimationFrame || 
    	        window.mozRequestAnimationFrame    || 
    	        window.oRequestAnimationFrame      || 
    	        window.msRequestAnimationFrame     ||  
    	        function(callback){
    	            return window.setTimeout(callback, 1000 / 60);
    	        };
    	})();
    	
    	window.cancelRequestAnimFrame = (function(){
    	    return window.cancelAnimationFrame          ||
    	        window.webkitCancelRequestAnimationFrame    ||
    	        window.mozCancelRequestAnimationFrame       ||
    	        window.oCancelRequestAnimationFrame     ||
    	        window.msCancelRequestAnimationFrame        ||
    	        clearTimeout
    	})();
    	
    	//Used to store the x & y coordinates of the mouse
    	this.mouse = {};
    },

    render: function(){
    	//Initialize Variable
		this.paddles = [];
		
		//Add render template
   		this.$el.html(homeTemplate);
   		
   		//Store canvas properties and window dimensions
   		this.canvas = document.getElementById("pong");
   		this.ctx = this.canvas.getContext('2d');
   		this.width = window.innerWidth;
   		this.height = window.innerHeight;
   		
   		//TODO: To be resized when with changes
   		this.canvas.width = this.width;
   		this.canvas.height = this.height;
   		   		
   		//Add the paddles and save a reference to them
   		this.paddles.push(new PaddleView('bottom', this.width, this.height));
   		this.paddles.push(new PaddleView('top', this.width, this.height));
   		
   		//Create Ball
   		this.ball = new BallView();
   		
   		//Update paddle position on mouse move - Using .bind to maintain context when this.mouse is being accessed from trackposition
   		this.canvas.addEventListener('mousemove', this.trackPosition.bind(this));

		//Start the animation
		this.animLoop();
   		return this;
    },
    
    draw: function(){
    	//Fill the screen with a black rectangle
    	this.ctx.fillStyle = 'black';
    	this.ctx.fillRect(0, 0, this.width, this.height);
    	
    	
    	for(var i = 0; i < this.paddles.length; i++){
    		p = this.paddles[i];
    		p.x = this.mouse.x - p.w/2;
    		p.render(this.ctx);
    	}
    	
    	//Render the ball
    	this.ball.render(this.ctx);
    	this.update();
    },
    
    //Update the positions of the canvas elements
    update: function(){
		if(this.mouse.x && this.mouse.y){
			for(var i = 0; i < this.paddles.length; i++){
				p = this.paddles[i];
				p.x = this.mouse.x - p.w/2;
			}
		}
		
		this.ball.x += this.ball.vx;
		this.ball.y += this.ball.vy;
		
		p1 = this.paddles[0];
		p2 = this.paddles[1];
		
		if(this.collides(this.ball, p1)){
			this.ball.vy = -this.ball.vy;
		}else if(this.collides(this.ball, p2)){
			this.ball.vy = -this.ball.vy;
		}else{
			//Check collision
			if(this.ball.y + this.ball.r > this.height){
				this.ball.y = this.height - this.ball.r;
				this.gameOver();
			}else if(this.ball.y < 0){
				this.ball.y = this.ball.r;
				this.gameOver();
			}
			
			//If the ball strikes the vertical walls, invert velocities
			if(this.ball.x + this.ball.r > this.width){
				this.ball.vx = -this.ball.vx;
				this.ball.x = this.width - this.ball.r;
			}else if(this.ball.x - this.ball.r < 0){
				this.ball.vx = -this.ball.vx;
				this.ball.x = this.ball.r;
			}
		}
    },
    
    //Check if the ball hits
    collides: function(b, p){
    	if(b.x + this.ball.r >= p.x && b.x - this.ball.r <= p.x + p.w){
    		if(b.y >= (p.y - p.h) && p.y > 0){
    			return true;
    		}else if(b.y <= p.h && p.y == 0){
    			return true;
    		}
    		
    		else return false;
    	}
    },
    
    //Track the position of the mouse
    trackPosition: function(e){
    	this.mouse.x = e.pageX;
    	this.mouse.y = e.pageY;
    },
    
    //Animation loop with .bind to link to view
    animLoop: function(){
    	this.init = requestAnimFrame(this.animLoop.bind(this));
    	this.draw();
    },
    
    gameOver: function(){
    	this.ctx.fillStlye = 'white';
    	this.ctx.font = '20px Arial, sans-serif';
    	this.ctx.textAlign = 'center';
    	this.ctx.textBaseline = 'middle';
    	this.ctx.fillText('Game Over', this.width/2, this.height/2 + 25 );
    	
    	// Stop the Animation
    	cancelRequestAnimFrame(this.init);
    }
  });

  return HomeView;
  
});
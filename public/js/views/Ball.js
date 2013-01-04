define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

	var BallView = Backbone.View.extend({
		initialize: function(){
			this.x = 50;
			this.y = 50;
			this.r = 5;
			this.c = 'white';
			this.vx = 4;
			this.vy = 8;
		},
		
  		render: function(ctx){
  			//TODO Create new model and use its default properties
  			ctx.beginPath();
  			ctx.fillStyle = this.c;
  			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  			ctx.fill();
  			
  			return this;
  		}
	});

	return BallView;
  
});
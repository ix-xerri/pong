define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

	var PaddleView = Backbone.View.extend({
		initialize: function(pos, width, height){
			this.h = 5;
			this.w = 150;
			this.x = width/2 - this.w/2;
			this.y = (pos == 'top') ? 0 : height - this.h;
		},
		
  		render: function(ctx){ 			
  			ctx.fillStyle = 'white';
  			ctx.fillRect(this.x, this.y, this.w, this.h);
  			
  			return this;
  		}
	});

	return PaddleView;
  
});
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView'
], function($, _, Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/': 'index',
      '*actions': 'index'      
      },
      
      index: function(){      	
      	$('#container').html(new HomeView().render().el);
      }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

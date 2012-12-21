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
      	// We have no matching route, lets display the home page 
      	var homeView = new HomeView();
      	homeView.render();
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

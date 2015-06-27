window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // var $rootEl = $("#backdrop");
    var router = new TrelloClone.Routers.BoardsRouter({$rootEl: $("#main")});
    //# looks for id, . looks for class
    Backbone.history.start(); //lets backbone navigation via #
  }
};

$(document).ready(function(){
  TrelloClone.initialize(); //only for rails pages, and runs only once
  //Backbone.History.Start();
});

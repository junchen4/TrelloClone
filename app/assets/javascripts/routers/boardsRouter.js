TrelloClone.Routers.BoardsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "showIndex",
    "boards/new": "newBoard",
    "boards/:id": "showBoard"
  },

  showIndex: function () {
    TrelloClone.Collections.boards.fetch(); 
    var boardsView = new TrelloClone.Views.BoardsIndex({collection: TrelloClone.Collections.boards});
    this._swapView(boardsView);
  },

  newBoard: function () {
    var newModel = new TrelloClone.Models.Board();
    var newBoardView = new TrelloClone.Views.NewBoard({collection: TrelloClone.Collections.boards, model: newModel});
    this._swapView(newBoardView);
  },

  showBoard: function (id) {
    var boardModel = TrelloClone.Collections.boards.getOrFetch(id);
    var boardShowView = new TrelloClone.Views.BoardShow({model: boardModel});
    this._swapView(boardShowView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});

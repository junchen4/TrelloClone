TrelloClone.Collections.Members = Backbone.Collection.extend({
  url: '/api/users',

  model: TrelloClone.Models.Member,

  comparator: function(model) {
    return model.get('email');
  },

  initialize: function(models, options) {
    this.board = options.board;
  }
});


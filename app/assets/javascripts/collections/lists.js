TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: '/api/lists',

  model: TrelloClone.Models.List,

  comparator: function(model) {
    console.log("comapring list");
    return model.get('ord');
  },

  initialize: function(models, options) {
    this.board = options.board;
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this;
    if(!model) {
      var model = new TrelloClone.Models.List({id: id});
      model.fetch({
        success: function () {
          collection.add(model);
        }
      });
    }
    else {
      model.fetch();
    }

    return model;
  }
});


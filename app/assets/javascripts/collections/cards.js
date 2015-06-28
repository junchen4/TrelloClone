TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: '/api/cards',

  model: TrelloClone.Models.Card,

  comparator: function(model) {
    return model.get('ord');
  },

  initialize: function(models, options) {
    this.list = options.list;
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this;
    if(!model) {
      var model = new TrelloClone.Models.Card({id: id});
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


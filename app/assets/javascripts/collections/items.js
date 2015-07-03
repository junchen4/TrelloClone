TrelloClone.Collections.Items = Backbone.Collection.extend({
  url: '/api/items',

  model: TrelloClone.Models.Item,

  comparator: function(model) {
    return model.get('id');
  },
  
  initialize: function(models, options) {
    this.card = options.card;
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this;
    if(!model) {
      var model = new TrelloClone.Models.Item({id: id});
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


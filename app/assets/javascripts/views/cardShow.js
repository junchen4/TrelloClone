TrelloClone.Views.CardShow = Backbone.CompositeView.extend ({
  tagName: 'div',

  className: 'card-show',

  template: JST['cardShow'],

  events: {
    'click .hide-card-modal': 'hideCardModal',
    'click .add-item-submit': 'addItem',
    'click .remove-item': 'removeItem',
    'click .toggle-done': 'toggleDone'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.items(), 'sync add remove', this.renderItems);
  },

  render: function () {
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.renderItems();
    return this;
  },

  hideCardModal: function (event) {
    event.preventDefault();
    $('body .card-overlay').addClass('hidden');
  },

  renderItems: function () {
    this.$('.items-area').empty();
    this.model.items().sort();
    this.model.items().each(function (item) {
      this.$('.items-area').append("<article data-id="+item.get('id')+" data-done="+item.get('done')+" class=group>"+item.get('title')+"<span class='toggle-done glyphicon glyphicon-ok' data-id="+item.get('id')+"></span> <button type='button' class='remove-item btn btn-danger btn-xs' data-id="+item.get('id')+">Remove</button> </article>"); 
    }.bind(this));
    this.$('.items-area article[data-done=true]').addClass('done');
  },

  addItem: function (event) {
    event.preventDefault();
    var itemTitle = this.$('input.add-item').val();
    if (itemTitle.length === 0 || !itemTitle.trim()) {
      this.$("input.add-item").effect("highlight", {}, 1000);
    } else {
      var newItem = new TrelloClone.Models.Item({card_id: this.model.get('id'), title: itemTitle});
      newItem.save({},{
        success: function () {
          this.model.items().add(newItem);
        }.bind(this)
      });
    }
  },

  removeItem: function (event) {
    event.preventDefault();
    var itemID = $(event.currentTarget).data('id');
    var item = this.model.items().get(itemID);
    item.destroy({
      success: function () {
        this.model.items().remove(item);
      }.bind(this)
    });
  },

  toggleDone: function (event) {
    event.preventDefault();
    var itemID = $(event.currentTarget).data('id');
    var item = this.model.items().get(itemID);
    if (item.get('done') == true) {
      item.set('done', false);
      this.$('article[data-id='+itemID+']').removeClass('done');
    } else {
      item.set('done', true);
      this.$('article[data-id='+itemID+']').addClass('done');
    }
    item.save();
  }

});

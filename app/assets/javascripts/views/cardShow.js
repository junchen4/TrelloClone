TrelloClone.Views.CardShow = Backbone.CompositeView.extend ({
  tagName: 'div',

  className: 'card-show',

  template: JST['cardShow'],

  events: {
    'click .hide-card-modal': 'hideCardModal'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({card: this.model});
    this.$el.html(content);
    return this;
  },

  hideCardModal: function (event) {
    event.preventDefault();
    $('body .card-overlay').addClass('hidden');
  }

});

TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  tagName: 'section',
  className: 'boards-index',
  template: JST['boardsIndex'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render) //automatically binds for us for listenTo only
  },

  render: function () {
    var content = this.template({boards: this.collection});
    this.$el.html(content);
    return this;
  }
});

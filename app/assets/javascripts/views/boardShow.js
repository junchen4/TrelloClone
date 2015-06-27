TrelloClone.Views.BoardShow = Backbone.View.extend({
  tagName: 'section',

  className: 'board-show',

  template: JST['boardShow'],

  render: function () {
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this;
  }

});

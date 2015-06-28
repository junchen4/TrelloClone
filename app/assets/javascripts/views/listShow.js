TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  tagName: 'div',

  className: 'list-show group',

  template: JST['listShow'],

  initialize: function () {
  	this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync', this.render);
  },

  render: function () {
    var content = this.template({list: this.model});
    this.$el.html(content);
    console.log(this.model.cards());
    return this;
  }

});

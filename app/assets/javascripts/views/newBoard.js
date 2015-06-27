TrelloClone.Views.NewBoard = Backbone.View.extend ({
  tagName: 'form',

  className: 'new-board',

  template: JST['newBoard'],

  events: {
    'click button': 'submit'
  },

  initialize: function () {
    //this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault(); //prevents refresh and go somewhere else we don't want it to (a redirect):
                              //http://localhost:3000/?board%5Btitle%5D=bagd#boards/new
    var formData = this.$el.serializeJSON();
    var that = this;
    this.model.set(formData);
    this.model.save({}, { //must have first parameter as an empty object
      success: function () {
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }

});

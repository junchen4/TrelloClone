TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  tagName: 'section',

  className: 'board-show',

  template: JST['boardShow'],

  events: {
  	"click .list-add-submit": "submitList",
  	"click button.delete-board": "deleteBoard"
  },

  initialize: function () {
  	this.listenTo(this.model, 'sync', this.render);
  	this.listenTo(this.model.lists(), 'sync add remove', this.render);  	
  },

  render: function () {
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.renderLists();
    return this;
  },

  renderLists: function () {
  	this.emptySubviewContainer('.lists');
  	this.model.lists().forEach(function (list) {
  		this.addList(list);
  	}.bind(this))
  },

  addList: function (list) {
  	var showView = new TrelloClone.Views.ListShow({model: list});
    this.addSubview('.lists', showView, true);
  },

  submitList: function (event) {
  	event.preventDefault();

  	var listName = this.$("input").val();
  	var list = new TrelloClone.Models.List({"board_id": this.model.get('id'), "title": listName});
  	list.save({}, {
  		success: function () {
  			this.model.lists().add(list, {merge: true});
  		}.bind(this)
  	});	
  },

  deleteBoard: function (event) {
  	event.preventDefault();
  	this.model.destroy({
  		success: function () {
  			TrelloClone.Collections.boards.remove(this.model);
        	Backbone.history.navigate("", {trigger: true});
  		}.bind(this)
  	})
  }

});

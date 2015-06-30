TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  tagName: 'section',

  className: 'board-show',

  template: JST['boardShow'],

  events: {
  	"click .list-add-submit": "submitList",
  	"click button.delete-board": "deleteBoard",
    'dropList': 'dropList'
  },

  initialize: function () {
  	this.listenTo(this.model, 'sync', this.render);
  	this.listenTo(this.model.lists(), 'sync add remove sort', this.renderLists);  	
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
  	var showView = new TrelloClone.Views.ListShow({model: list, board: this.model});
    this.addSubview('.lists', showView, true);
  },

  submitList: function (event) {
  	event.preventDefault();

  	var listName = this.$("input").val();
    var ordArray = this.model.lists().pluck("ord");
    var maxOrd = Math.max.apply(null, ordArray);
    if (this.model.lists().length != 0) {
      var newOrd = maxOrd + 1;
    } else {
      var newOrd = 0;
    }

  	var list = new TrelloClone.Models.List({"board_id": this.model.get('id'), "title": listName, "ord": newOrd});
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
  },

  dropList: function(event, listID, position) {
    var arrayPosition = this.model.lists().length - position - 1;
    var model = this.model.lists().get(listID);
    this.model.lists().remove(model, {silent: true});

    this.model.lists().each(function (model, index) {
        var ord = this.model.lists().length + 1 - index;
        if (index >= arrayPosition) {
            ord -= 1;
        }
        model.set('ord', ord);
    }.bind(this));            

    model.set('ord', position);
    this.model.lists().add(model, {at: arrayPosition, silent: true});
    this.model.lists().sort();
  }

});

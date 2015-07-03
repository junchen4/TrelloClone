TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  tagName: 'section',

  className: 'board-show',

  template: JST['boardShow'],

  events: {
  	"click .list-add-submit": "submitList",
  	"click button.delete-board": "displayDeleteBoardModal",
    'dropList': 'dropList', 
    "click button.add-member-submit": "submitMember",
    "click span.remove-member": "removeMember"
  },

  initialize: function () {
  	this.listenTo(this.model, 'sync', this.render);
  	this.listenTo(this.model.lists(), 'sync add remove sort', this.renderLists);
    this.listenTo(this.model.members(), 'sync add remove sort', this.render);
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

  	var listName = this.$("input.list-add-input").val();
    if (listName.length === 0 || !listName.trim()) {
      this.$("input.list-add-input").effect("highlight", {}, 1000);
    } else {
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
    }
  },

  displayDeleteBoardModal: function (event) {
  	event.preventDefault();
    $('body .overlay').toggleClass('hidden');
    $('body .overlay .confirm-board-remove button.confirm-delete-board').on('click', this.deleteBoard.bind(this));
    $('body .overlay .confirm-board-remove button.confirm-no-delete-board').on('click', this.rejectDeleteBoard.bind(this));   
},

  deleteBoard: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        TrelloClone.Collections.boards.remove(this.model);
        $('body .overlay').addClass('hidden');
        $('body .overlay .confirm-board-remove button.confirm-delete-board').unbind("click");
        Backbone.history.navigate("", {trigger: true});
      }.bind(this)
    })
  },

  rejectDeleteBoard: function (event) {
    event.preventDefault();
    $('body .overlay').addClass('hidden');
    $('body .overlay .confirm-board-remove button.confirm-no-delete-board').unbind("click");
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
  },

  submitMember: function (event) {
    var email = this.$('input.add-member').val();

     $.ajax({
          data: {board_membership: {email: email, board_id: this.model.get('id')}},
          type: 'POST',
          url: '/api/board_memberships',
          success: function(response) {
            if (response == null) {
              this.$(".add-board-member input.add-member").effect("highlight", {}, 1000);
            } else {
              var member = new TrelloClone.Models.Member({id: response.user_id, email: response.member.email});
              this.model.members().add(member);
            }
          }.bind(this)
      });  
  },

  removeMember: function (event) {
    event.preventDefault();
    var memberID = $(event.currentTarget).data('member-id');
    var clickedModel = this.model.members().get(memberID);
    this.model.members().remove(clickedModel);

     $.ajax({
        data: {board_membership: {user_id: memberID, board_id: this.model.get('id')}},
        type: 'DELETE',
        url: '/api/board_memberships/destroy' 
     });  
  }

});

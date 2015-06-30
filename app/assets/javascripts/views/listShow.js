TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  tagName: 'div',

  className: 'list-show group',

  template: JST['listShow'],

  events: {
    'mouseover': 'toggleRemoveCard',
    'mouseout': 'toggleRemoveCard',
    'click .add-card-area a': 'toggleAddCard',
    'click .add-card-area form span': 'toggleAddCard',
    'click .add-card-area button.card-add-submit': 'addCard',
    'click .cards span.remove-card': 'removeCard',
    'click .title-area span.remove-list': 'removeList',
    'dropCard': 'dropCard'
  },

  initialize: function (options) {
    this.board = options.board;
  	this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync change add remove sort', this.renderCards);
  },

  render: function () {
    $(this.el).attr('id', 'listID_' + this.model.get('id'));
    $(this.el).attr('data-id', this.model.get('id'));  
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.renderCards();
    return this;
  },

  renderCards: function () {
    this.$('.card-list-area').empty();
    this.model.cards().each(function (card) {
      this.$el.find('.card-list-area').append("<article id=cardID_"+card.get('id')+" data-id="+card.get('id')+" class=group>"+card.escape('title')+"<span class='remove-card hidden glyphicon glyphicon-remove' data-sort="+card.get('id')+"></span> </article>"); 
    }.bind(this));
  },

  toggleRemoveCard: function (event) {
    event.preventDefault();
    this.$('.remove-card').toggleClass('hidden');
  },

  toggleAddCard: function (event) {
    event.preventDefault();
    this.$('.add-card-area a').toggleClass('hidden');
    this.$('.add-card-area form').toggleClass('hidden');
  },

  addCard: function (event) {
    event.preventDefault();

    var cardTitle = this.$("textarea").val();
    var ordArray = this.model.cards().pluck("ord");
    var maxOrd = Math.max.apply(null, ordArray);
    if (this.model.cards().length != 0) {
      var newOrd = maxOrd + 1;
    } else {
      var newOrd = 0;
    }

    var card = new TrelloClone.Models.Card({"list_id": this.model.get('id'), "title": cardTitle, "ord": newOrd});
    card.save({}, {
      success: function () {
        this.model.cards().add(card, {merge: true});
      }.bind(this)
    }); 
  },

  removeCard: function (event) {
    event.preventDefault();
    var cardID = $(event.currentTarget).data('sort');
    var card = this.model.cards().get(cardID);
    card.destroy({
      success: function () {
        this.model.cards().remove(card);
      }.bind(this)
    })
  },

  removeList: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        this.board.lists().remove(this.model);
      }.bind(this)
    });
  },

  dropCard: function(event, cardID, position) {
    var model = this.model.cards().get(cardID);
    this.model.cards().remove(model, {silent: true});

    this.model.cards().each(function (model, index) {
        var ord = index;
        if (index >= position) {
            ord += 1;
        }
        model.set('ord', ord);
    }.bind(this));            

    model.set('ord', position);
    this.model.cards().add(model, {at: position, silent: true});
    this.model.cards().sort();
  }

});

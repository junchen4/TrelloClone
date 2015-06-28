#should include the board
#  - its lists
#    - the cards for each list
json.extract! @board, :title

json.lists @board.lists do |list|
	json.extract! list, :title, :ord 

	json.cards list.cards do |card|
		json.extract! card, :title, :description, :ord
	end
end
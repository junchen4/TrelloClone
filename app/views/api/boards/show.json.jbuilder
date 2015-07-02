#should include the board
#  - its lists
#    - the cards for each list
json.extract! @board, :id, :title

json.lists @board.lists do |list|
	json.extract! list, :id, :title, :ord 

	json.cards list.cards do |card|
		json.extract! card, :id, :title, :description, :ord, :list_id
	end
end

json.members @board.members do |member|
	json.extract! member, :id, :email
end
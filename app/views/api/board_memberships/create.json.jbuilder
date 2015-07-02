json.extract! @board_membership, :id, :board_id, :user_id

json.member @board_membership.user, :id, :email
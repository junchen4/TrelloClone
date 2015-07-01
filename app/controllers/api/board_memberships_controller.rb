module Api
  class BoardMembershipsController < ApiController
  	def create
  		@user = User.where(email: board_membership_params[:email]).first
  		if @user.nil?
	        render json: @user, status: 200 #response is "null" to BackboneJS
	        return
  		else 
  			@board_membership = BoardMembership.new({board_id: board_membership_params[:board_id], user_id: @user.id})
	  		if @board_membership.save
		        render json: @board_membership
		    else
		        render json: @board_membership.full_messages, status: :unprocessable_entity
		    end
  		end
  	end

  	private
  	def board_membership_params
  		params.require(:board_membership).permit(:email, :board_id)
  	end
  end
end

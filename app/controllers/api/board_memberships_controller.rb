
module Api
  class BoardMembershipsController < ApiController
  	def create
  		@user = User.where(email: board_membership_params[:email]).first
  		if @user.nil?
	        render json: @user, status: 200 #response is "null" to BackboneJS
	        return
  		else 
        
        if !BoardMembership.where({board_id: board_membership_params[:board_id], user_id: @user.id}).empty?
          #already exists
          render json: nil, status: 200
          return
        end

  			@board_membership = BoardMembership.new({board_id: board_membership_params[:board_id], user_id: @user.id})
	  		if @board_membership.save
		        render :create
		    else
		        render json: @board_membership.full_messages, status: :unprocessable_entity
		    end
  		end
  	end

    def destroy
      @board_membership = BoardMembership.where({user_id: board_membership_params[:user_id], board_id: board_membership_params[:board_id]}).first
      @board_membership.try(:destroy)
      render json: {}
    end

  	private
  	def board_membership_params
  		params.require(:board_membership).permit(:email, :board_id, :user_id)
  	end
  end
end

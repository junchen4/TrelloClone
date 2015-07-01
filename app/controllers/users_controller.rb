class UsersController < ApplicationController
  def new; end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def find_by_email
    @user = User.where(email: params[:email])
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end

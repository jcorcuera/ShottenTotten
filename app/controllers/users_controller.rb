class UsersController < ApplicationController
  respond_to :json

  def create
    @user = User.new
    @user.id, @user.username = params[:id], params[:username]
    @user.save
    render json: @user
  end

end

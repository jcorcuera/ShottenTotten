class UsersController < ApplicationController
  after_filter :check_for_game_setup

  respond_to :json

  def create
    @game = Game.find(params[:game_id])
    @user = @game.users.new
    @user.id, @user.username = params[:id], params[:username]
    @user.save
    render json: @user
  end

  protected

  def check_for_game_setup
    @game.start if @game.users.count == 2
  end

end

class StonesController < ApplicationController
  before_filter :load_game

  respond_to :json

  def index
    @stones = @game.stones
    respond_with @stones
  end

  def show
    @stone = @game.stones.find(params[:id])
    render json: @stone
  end

  def update
    @stone = @game.stones.find(params[:id])
    @stone.update_attribute(:user_id, params[:user_id])
    render json: @stone
  end

  protected

  def load_game
    @game = Game.find(params[:game_id])
  end

end

class StonesController < ApplicationController
  before_filter :load_game

  respond_to :json

  def index
    @stones = @game.stones
    respond_with @stones
  end

  protected

  def load_game
    @game = Game.find(params[:game_id])
  end

end

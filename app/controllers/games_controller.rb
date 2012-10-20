class GamesController < ApplicationController

  def create
    @game = Game.new
    if @game.save
      redirect_to @game
    else
      redirect_to root_path, flash: {error: "Your game couldn't be created."}
    end
  end

  def show
    @game = Game.find(params[:id])
  end

end

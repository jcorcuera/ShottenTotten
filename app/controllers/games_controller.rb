class GamesController < ApplicationController
  respond_to :html, :json

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
    respond_with @game
  end

  def user_info
    respond_with({
      id: "#{(Time.now).to_i}#{(Random.rand * 999).to_i}",
      socketURL: self.get_socket_url
    })
  end

  protected
  def get_socket_url
    Rails.env.production? ? "" : "http://0.0.0.0:5000"
  end

end

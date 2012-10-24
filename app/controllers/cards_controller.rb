class CardsController < ApplicationController
  before_filter :load_user, only: :index

  respond_to :json

  def index
    @game = Game.find(params[:game_id])
    @cards = @game.cards_for_user(@user)
    respond_with @cards
  end

  protected

  def load_user
    if params[:token]
      @user = User.find_by_token(params[:token])
    end
  end

end

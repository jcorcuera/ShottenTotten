class CardsController < ApplicationController
  before_filter :load_user, :load_game

  respond_to :json

  def index
    @cards = @game.cards.on_board
    @cards += @game.cards.on_hand.by_user(@user) if @user
    respond_with @cards
  end

  def update
    @card = @game.cards.by_user(@user).find(params[:id])
    @card.update_attributes(
      position_on_hand: params[:position_on_hand],
      position_on_board: params[:position_on_board]
    )
    @game.deal_to(@user)
    @game.assign_turn_to_players
    render json: @card
  end

  protected

  def load_user
    if params[:token]
      @user = User.find_by_token(params[:token])
    end
  end

  def load_game
    @game = Game.find(params[:game_id])
  end

end

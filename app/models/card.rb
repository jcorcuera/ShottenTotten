class Card < ActiveRecord::Base
  belongs_to :game

  attr_accessible :color, :position_on_board, :position_on_hand, :value
end

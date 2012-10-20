class Card < ActiveRecord::Base
  attr_accessible :color, :position_on_board, :position_on_hand, :value
end

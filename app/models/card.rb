class Card < ActiveRecord::Base
  belongs_to :game
  belongs_to :user

  attr_accessible :color, :position_on_board, :position_on_hand, :value

  scope :on_board, where("position_on_board IS NOT NULL")
  scope :on_hand, where("position_on_hand IS NOT NULL")

  scope :by_user, ->(user_id) { where(user_id: user_id) }

end

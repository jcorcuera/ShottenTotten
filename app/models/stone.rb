class Stone < ActiveRecord::Base
  belongs_to :game
  belongs_to :user

  attr_accessible :position, :user
end

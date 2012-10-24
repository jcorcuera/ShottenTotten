class Game < ActiveRecord::Base

  COLORS = %w{black red blue orange purple green}
  NUMBERS = (1..9).to_a

  has_many :users
  has_many :cards

  def setup
    COLORS.each do |color|
      NUMBERS.each do |number|
        Card.create(color: color, value: number)
      end
    end
  end

end

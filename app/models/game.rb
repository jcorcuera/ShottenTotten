class Game < ActiveRecord::Base

  COLORS = %w{black red blue orange purple green}
  NUMBERS = (1..9).to_a
  MAX_CARDS_ON_HAND = 6

  has_many :users
  has_many :cards
  has_many :stones

  attr_accessible :position, :turn_id

  after_create :setup

  def setup
    cards_data = []
    COLORS.each do |color|
      NUMBERS.each do |number|
        cards_data << {color: color, value: number}
      end
    end
    cards_data.shuffle!
    self.cards.create(cards_data)

    6.times do |position|
      self.stones.create(position: position)
    end
  end

  def start
    self.users.each {|user| deal_to(user) }
    assign_turn_to_players
  end

  def deal_to(user)
    available_positions = available_positions_on_hand(user)
    selected_cards = self.cards.on_deck.limit(available_positions.count)
    selected_cards.each do |card|
      card.user = user
      card.position_on_hand = available_positions.shift
      card.save
    end
  end

  def available_positions_on_hand(user)
    used_positions = self.cards.on_hand.by_user(user).select(:position_on_hand).map(&:position_on_hand)
    (1..MAX_CARDS_ON_HAND).to_a - used_positions
  end

  def assign_turn_to_players
    user_ids = self.users.map &:id
    next_turn = if turn_id.present?
                  (user_ids - [turn_id])[0]
                else
                  user_ids.sample
                end
    update_attribute(:turn_id, next_turn)
  end

end

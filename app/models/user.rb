class User < ActiveRecord::Base
  attr_accessible :token, :username

  belongs_to :game

  before_create :set_token, :set_position

  protected

  def set_token
    self.token = Digest::MD5.base64digest("#{self.id}#{self.username}").gsub(/[\/&+]/,'')
  end

  def set_position
    self.position = self.game.users.count
  end

end

class User < ActiveRecord::Base
  attr_accessible :token, :username

  belongs_to :game

  before_create :set_token

  protected

  def set_token
    self.token = Digest::MD5.base64digest("#{self.id}#{self.username}").gsub(/[\/&+]/,'')
  end

end

class User < ActiveRecord::Base
  attr_accessible :token, :username

  before_create :set_token

  protected

  def set_token
    self.token = Digest::MD5.base64digest("#{self.id}#{self.username}")
  end

end

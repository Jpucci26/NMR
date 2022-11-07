class User < ApplicationRecord
  has_many :reports, dependent: :restrict_with_error
  has_secure_password

  validates :username, presence: true
end

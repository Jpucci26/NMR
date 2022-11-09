class User < ApplicationRecord
  has_many :categories, dependent: :restrict_with_exception
  has_many :reports, dependent: :restrict_with_exception
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
end

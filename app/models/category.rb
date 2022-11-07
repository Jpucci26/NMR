class Category < ApplicationRecord
  has_many :reports, dependent: :restrict_with_error
  has_many :locations, through: :reports

  validates :name, presence: true
end

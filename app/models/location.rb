class Location < ApplicationRecord
  has_many :reports, dependent: :restrict_with_exception
  has_many :categories, through: :reports

  validates :name, presence: true
end

class Report < ApplicationRecord
  belongs_to :user
  belongs_to :location
  belongs_to :category

  validates :title, presence: true
  
end

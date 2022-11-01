class Report < ApplicationRecord
  belongs_to :user
  belongs_to :location
  belongs_to :category
end

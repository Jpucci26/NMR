class Location < ApplicationRecord
    has_many :reports
    has_many :categories, through: :reports
end

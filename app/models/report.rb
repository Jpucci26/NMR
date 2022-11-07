class Report < ApplicationRecord
  belongs_to :user
  belongs_to :location
  belongs_to :category

  validates :title, presence: true

  def created_at_fmt
    created_at.to_fs(:short)
  end
end

class Report < ApplicationRecord
  has_many :notes, dependent: :restrict_with_exception
  belongs_to :user
  belongs_to :location
  belongs_to :category

  validates :title, presence: true
  validates :description, presence: true

  def category_lead
    category.user
  end

  def created_at_fmt
    created_at.to_fs(:short)
  end
end

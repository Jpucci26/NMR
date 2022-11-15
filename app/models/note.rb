class Note < ApplicationRecord
  belongs_to :user
  belongs_to :report

  default_scope -> { order(created_at: :desc) }, all_queries: true


  def created_at_fmt
    created_at.to_fs(:short)
  end
end

class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :corrective_action, :final_action, :status,
             :created_at_fmt, :created_at, :category_lead
  has_one :user
  has_one :location
  has_one :category
end

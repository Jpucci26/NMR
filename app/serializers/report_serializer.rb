class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :corrective_action, :final_action
  has_one :user
  has_one :location
  has_one :category
end

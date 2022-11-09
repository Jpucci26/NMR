class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status, :user_id, :created_at, :updated_at
  has_one :user
end

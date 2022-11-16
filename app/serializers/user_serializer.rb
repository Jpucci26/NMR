class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :title, :phone, :created_at, :updated_at, :avatar
end

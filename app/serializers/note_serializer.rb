class NoteSerializer < ActiveModel::Serializer
  attributes :id, :task, :body, :created_at_fmt
  has_one :user
  has_one :report
end

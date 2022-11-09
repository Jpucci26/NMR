class AddUserToCategory < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :description, :text
    add_reference :categories, :user, null: true, foreign_key: true
    add_column :categories, :status, :string
  end
end

class AddContactInfoToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :email, :string
    add_column :users, :phone, :string
    add_column :users, :title, :string
  end
end

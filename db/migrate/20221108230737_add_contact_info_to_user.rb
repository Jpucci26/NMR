class AddContactInfoToUser < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :email
      t.string :phone
      t.string :title
    end
  end
end

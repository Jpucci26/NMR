class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :report, null: false, foreign_key: true
      t.string :task
      t.text :body

      t.timestamps
    end
  end
end

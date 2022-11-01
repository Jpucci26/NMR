class CreateReports < ActiveRecord::Migration[7.0]
  def change
    create_table :reports do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.references :location, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :corrective_action
      t.string :final_action

      t.timestamps
    end
  end
end

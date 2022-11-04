class AddStatusToReports < ActiveRecord::Migration[7.0]
  def change
    add_column :reports, :status, :string, default: :open
  end
end

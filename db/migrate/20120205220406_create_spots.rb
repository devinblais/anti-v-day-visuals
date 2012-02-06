class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
      t.integer :location
      t.references :team

      t.timestamps
    end
    add_index :spots, :team_id
  end
end

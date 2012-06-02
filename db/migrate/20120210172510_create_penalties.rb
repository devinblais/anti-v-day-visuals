class CreatePenalties < ActiveRecord::Migration
  def change
    create_table :penalties do |t|
      t.boolean :alcohol
      t.boolean :crossfit
      t.boolean :active
      t.string :name
      t.string :img_src

      t.timestamps
    end
  end
end

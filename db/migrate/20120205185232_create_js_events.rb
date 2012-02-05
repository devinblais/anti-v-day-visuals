class CreateJsEvents < ActiveRecord::Migration
  def change
    create_table :js_events do |t|
      t.string :functionName

      t.timestamps
    end
  end
end

class AddArgsToJsEvents < ActiveRecord::Migration
  def change
    add_column :js_events, :args, :string
  end
end

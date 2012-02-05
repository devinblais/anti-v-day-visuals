class RenameTypeInMedia < ActiveRecord::Migration
  def change
    rename_column :media, :type, :format
  end
end

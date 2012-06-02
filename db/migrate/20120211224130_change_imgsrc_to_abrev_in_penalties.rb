class ChangeImgsrcToAbrevInPenalties < ActiveRecord::Migration
  def change
    rename_column :penalties, :img_src, :abrev
  end
end

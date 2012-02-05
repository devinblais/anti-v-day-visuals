class AddNameAndArtistToMedia < ActiveRecord::Migration
  def change
    add_column :media, :name, :string
    add_column :media, :artist, :string
  end
end

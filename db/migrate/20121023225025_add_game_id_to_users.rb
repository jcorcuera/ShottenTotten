class AddGameIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :game_id, :integer
    add_index :users, :game_id
  end
end

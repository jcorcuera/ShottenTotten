class AddCurrentTurnAndNextTurnToGame < ActiveRecord::Migration
  def change
    add_column :games, :turn_id, :integer
  end
end

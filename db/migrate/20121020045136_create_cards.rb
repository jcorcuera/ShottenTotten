class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references :game
      t.integer :value
      t.string :color
      t.integer :position_on_board
      t.integer :position_on_hand

      t.timestamps
    end
  end
end

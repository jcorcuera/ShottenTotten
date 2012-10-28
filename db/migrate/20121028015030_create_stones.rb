class CreateStones < ActiveRecord::Migration
  def change
    create_table :stones do |t|
      t.references :game
      t.references :user
      t.integer :position
    end
  end
end

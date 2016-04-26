class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :user_id, null: false
      t.integer :list_head

      t.timestamps null: false
    end
    add_index :lists, :user_id, unique: true
    add_index :lists, :list_head, unique: true
  end
end

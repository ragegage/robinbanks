class CreateStockListItems < ActiveRecord::Migration
  def change
    create_table :stock_list_items do |t|
      t.integer :list_id, null: false
      t.integer :stock_id, null: false
      t.integer :next_stock_list_id

      t.timestamps null: false
    end
    add_index :stock_list_items, :list_id
    add_index :stock_list_items, :stock_id
    add_index :stock_list_items, :next_stock_list_id
  end
end

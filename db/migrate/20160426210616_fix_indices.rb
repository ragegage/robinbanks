class FixIndices < ActiveRecord::Migration
  def change
    remove_index :lists, :list_head
    remove_index :stock_list_items, :next_stock_list_id
  end
end

class AddConstraintToStockListItems < ActiveRecord::Migration
  def change
   add_index :stock_list_items, [:stock_id, :list_id], unique: true
  end
end

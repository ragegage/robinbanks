class StockListItem < ActiveRecord::Base
  validates :list_id, :stock_id, presence: true
end

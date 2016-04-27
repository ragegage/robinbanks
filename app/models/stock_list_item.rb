class StockListItem < ActiveRecord::Base
  validates :list_id, :stock_id, presence: true

  belongs_to :list
  belongs_to :stock
end

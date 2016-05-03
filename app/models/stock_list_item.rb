class StockListItem < ActiveRecord::Base
  validates :list_id, :stock_id, presence: true
  validates :stock_id, uniqueness: {scope: :list_id}

  belongs_to :list
  belongs_to :stock
end

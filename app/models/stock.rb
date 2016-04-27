class Stock < ActiveRecord::Base
  validates :ticker_symbol, presence: true, uniqueness: true

  has_many :stock_list_items
end

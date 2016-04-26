class Stock < ActiveRecord::Base
  validates :ticker_symbol, presence: true, uniqueness: true
end

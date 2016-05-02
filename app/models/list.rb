class List < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: true

  belongs_to :user
  has_many :stock_list_items

  def populate_self!
    #pre-fill list with the first 5 stocks

    @current_stock_item = StockListItem.create(
                            list_id: self.id,
                            stock_id: Stock.first.id)
    self.list_head = @current_stock_item.id

    self.save

    stocks = Stock.limit(5)

    4.times do |idx|

      next_stock = StockListItem.create(list_id: self.id,
                                        stock_id: stocks[idx + 1].id)

      @current_stock_item.next_stock_list_id = next_stock.id

      @current_stock_item.save

      @current_stock_item = next_stock

    end

    # list is now created, and there are 5 StockListItems in its linked list

  end

  def depopulate_self!
    self.stock_list_items.destroy_all
  end
end

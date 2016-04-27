class List < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: true

  belongs_to :user
  has_many :stock_list_items

  def populate_self!
    #pre-fill list with some stocks
    @current_stock_item = StockListItem.create(
                            list_id: self.id,
                            stock_id: Stock.first.id)
    self.list_head = @current_stock_item.id
    @current_stock_item.next_stock_list_id = StockListItem.create(
                                               list_id: self.id,
                                               stock_id: Stock.last.id).id
    self.save
    @current_stock_item.save
  end

  def depopulate_self!
    self.stock_list_items.destroy_all
  end
end

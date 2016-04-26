class Api::StockListItemsController < ApplicationController
  def create
    @stock_list_item = StockListItem.new(stock_list_item_params)
    if @stock_list_item.save
      status = 200
      render 'api/lists/show', status: status
    else
      status = 500
      @errors = @stock_list_item.errors.full_messages
      render 'api/lists/show', status: status
    end
  end
  def update
  end
  def destroy
  end
end

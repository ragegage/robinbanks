class Api::StockListItemsController < ApplicationController
  def create
    @stock_list_item = StockListItem.new(stock_list_item_params)
    @stock_list_item.list_id = List.find(user_id: current_user.id).id

    if @stock_list_item.save
      set_list_tail!
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

  private
  def stock_list_item_params
    params.require(:stock_list_item).permit(:stock_id)
  end

  def set_list_tail!
    @list = List.find(@stock_list_item.list_id)
    if @list.list_head
      @stock_list_item_last_link = StockListItem.find(list_head)
      while(@stock_list_item_last_link.next_stock_list_id) do
        @stock_list_item_last_link = StockListItem.find(next_stock_list_id)
      end
      @stock_list_item_last_link.next_stock_list_id = @stock_list_item.id
      @stock_list_item_last_link.save
    else
      @list.list_head = @stock_list_item.id
      @list.save
    end
    # run through linked list until next_stock_list_id = nil
    # set that next_stock_list_id = @stock_list_item.id
  end
end

class Api::StockListItemsController < ApplicationController
  def create
    @stock_list_item = StockListItem.new(stock_list_item_params)
    @stock_list_item.list_id = List.find(user_id: current_user.id).id

    if @stock_list_item.save
      set_as_list_tail!
      status = 200
      render 'api/lists/show', status: status
    else
      status = 500
      @errors = @stock_list_item.errors.full_messages
      render 'api/lists/show', status: status
    end
  end

  def update
    @stock_list_item = StockListItem.find(params[:id])
    @new_sibling = StockListItem.find(params[:before_id])
    begin
      move_list_node!
      status = 200
      render 'api/lists/show', status: status
    rescue ActiveRecord::RecordNotFound => e
      status = 500
      @errors = ["no record found"]
      render 'api/lists/show', status: status
    end
  end
  
  def destroy
    @stock_list_item = StockListItem.find(params[:id])
    @list = List.find(@stock_list_item.list_id)
    remove_stock_list_item!
    @stock_list_item.destroy
    status = 200
    render 'api/lists/show', status: status
  end

  private
  def stock_list_item_params
    params.require(:stock_list_item).permit(:stock_id)
  end

  def set_as_list_tail!
  # run through linked list until next_stock_list_id = nil
  # set that next_stock_list_id = @stock_list_item.id
    @list = List.find(@stock_list_item.list_id)
    if @list.list_head
      @stock_list_item_last_link = StockListItem.find(list_head)
      while(@stock_list_item_last_link.next_stock_list_id) do
        @stock_list_item_last_link = StockListItem.find(@stock_list_item_last_link.next_stock_list_id)
      end
      @stock_list_item_last_link.next_stock_list_id = @stock_list_item.id
      @stock_list_item_last_link.save
    else
      @list.list_head = @stock_list_item.id
      @list.save
    end
  end

  def move_list_node!
    # moves @stock_list_item to @new_sibling.next_stock_list_id
    # pushes next item one farther back
    @list = List.find(@stock_list_item.list_id)

    remove_stock_list_item!

    if @new_sibling
      @stock_list_item.next_stock_list_id = @new_sibling.next_stock_list_id
      @new_sibling.next_stock_list_id = @stock_list_item.id
      @stock_list_item.save
      @new_sibling.save
    else
      @new_next = StockListItem.find(@list.list_head)
      @list.list_head = @stock_list_item.id
      @stock_list_item.next_stock_list_id = @new_next.id
      @stock_list_item.save
      @list.save
    end
  end

  def remove_stock_list_item!
    # cuts @stock_list_item out of linked list
    debugger
    if(@list.list_head == @stock_list_item.id)
      @list.list_head = @stock_list_item.next_stock_list_id
      @list.save
    else
      @other_item = StockListItem.find(@list.list_head)
      until(@other_item.next_stock_list_id == @stock_list_item.id) do
        @other_item = StockListItem.find(@other_item.next_stock_list_id)
      end
      @other_item.next_stock_list_id = @stock_list_item.next_stock_list_id
      @other_item.save
    end
  end
end

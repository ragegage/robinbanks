class Api::ListsController < ApplicationController
  def show
    @list = current_user.list
    next_node_id = @list.list_head
    @orderedList = []
    while(next_node_id) do
      node = StockListItem.find(next_node_id)
      @orderedList << node
      next_node_id = node.next_stock_list_id
    end
    render :show
  end
end

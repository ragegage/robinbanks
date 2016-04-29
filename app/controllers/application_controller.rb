require 'net/http'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def current_user
    @current_user || User.find_by(session_token: session[:session_token])
  end

  def login! user
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
  end

  def generate_ordered_array list
    next_node_id = list.list_head
    @ordered_list = []



    while(next_node_id) do
      node = StockListItem.includes(:stock).find(next_node_id)
      @ordered_list << node
      next_node_id = node.next_stock_list_id
    end



    url = "https://finance.yahoo.com/webservice/v1/symbols/"
            .concat(@ordered_list.map(){|i| i.stock.ticker_symbol}.join(","))
            .concat("/quote?format=json")


    string = HTTP.get(url).to_s

    data = JSON.parse string

    @ordered_list.zip(data["list"]["resources"])

      # TRY THIS TO GET RID OF EXTRA N + 1 QUERIES
      # node = StockListItem.includes(stock: [:ticker_symbol])
      #                     .find(next_node_id)
      #
      # also maybe try chaining the queries?
  end
end

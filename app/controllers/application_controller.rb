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
    @errors = []


    # generates ordered array
    while(next_node_id) do
      node = StockListItem.includes(:stock).find(next_node_id)
      @ordered_list << node
      next_node_id = node.next_stock_list_id
    end


    # fetches current price for each element in array, zips the information
    current_price_url = "https://finance.yahoo.com/webservice/v1/symbols/"
            .concat(@ordered_list.map(){|i| i.stock.ticker_symbol}.join(","))
            .concat("/quote?format=json")

    current_price_string = HTTP.get(current_price_url).to_s

    begin
      current_price_data = JSON.parse current_price_string
      @ordered_list = @ordered_list.zip(current_price_data["list"]["resources"])
    rescue JSON::ParserError => e
      @errors << e
    end



    # fetches monthly data for each element in array
    month_data_url = "https://query.yahooapis.com/v1/public/yql"
            .concat("?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20in%20%20")
            .concat("('#{@ordered_list.map(){|i| i[0].stock.ticker_symbol}.join("','")}')")
            .concat("%20and%20startDate%20%3D%20%22")
            .concat(Date.today.prev_month.to_s)
            .concat("%22%20and%20%20endDate%20%3D%20%22")
            .concat(Date.today.to_s)
            .concat("%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")

    month_data_string = HTTP.get(month_data_url).to_s

    begin
      month_data = JSON.parse month_data_string

      ordered_historical_data = []

      if month_data["query"]["count"].to_i > 0
        month_data = month_data["query"]["results"]["quote"]

        ordered_historical_data = get_array_of_historical_data month_data
      end

      ordered_historical_data.map! {|stock_data| stock_data.reverse }

      @ordered_list = @ordered_list.zip(ordered_historical_data)
    rescue JSON::ParserError => e2
      @errors << e2
    end
      # TRY THIS TO GET RID OF EXTRA N + 1 QUERIES
      # node = StockListItem.includes(stock: [:ticker_symbol])
      #                     .find(next_node_id)
      #
      # also maybe try chaining the queries?
  end

  def get_array_of_historical_data historical_data

    # loop through list, put item["Symbol"], item["Date"], and item["Close"] into a new object
      # those objects get put into an array for each symbol
        # those arrays get put into another array (month_data_arr)

    current_symbol = nil
    data_arr = []
    count = -1
    historical_data.each do |datum|
      desired_datum_data = {
                             ticker: datum["Symbol"],
                             date: datum["Date"],
                             close: datum["Close"].to_f.round(2)
                           }
      if datum["Symbol"] == current_symbol
        data_arr[count] << desired_datum_data
      else
        data_arr << [desired_datum_data]
        current_symbol = datum["Symbol"]
      end
    end
    data_arr
  end
end

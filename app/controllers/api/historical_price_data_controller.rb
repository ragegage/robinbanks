class Api::HistoricalPriceDataController < ApplicationController
  def show
    start_date, end_date = create_date_range params[:range]
    fetch_historical_price_data params[:ticker], start_date, end_date
    status = (@data ? 200 : 500)
    render :show
  end

  private
  def create_date_range range_options
    end_date = Date.today.to_s
    start_date = case range_options
    when "1M"
      1.month.ago.to_s.slice(0, 10)
    when "3M"
      3.months.ago.to_s.slice(0, 10)
    when "6M"
      6.months.ago.to_s.slice(0, 10)
    when "1Y"
      1.year.ago.to_s.slice(0, 10)
    end
    [start_date, end_date]
  end

  def fetch_historical_price_data ticker, start_date, end_date

    url = "https://query.yahooapis.com/v1/public/yql"
            .concat("?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%20%22")
            .concat(ticker)
            .concat("%22%20and%20startDate%20%3D%20%22")
            .concat(start_date)
            .concat("%22%20and%20%20endDate%20%3D%20%22")
            .concat(end_date)
            .concat("%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")

    string = HTTP.get(url).to_s

    @data = JSON.parse string

    if @data["query"]["count"].to_i > 0
      @data = @data["query"]["results"]["quote"].reverse
    else
      @data = nil
      @errors = ["data could not be loaded"]
    end
  end
end

class Api::ListsController < ApplicationController
  def show
    fetch_historical_price_data params[:ticker], params[:start], params[:end]
    render :show
  end

  private
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
      @data = @data["query"]["results"]["quote"]
      render :show
    else

    end

  end
end

# $.ajax({
#   method: 'GET',
#   url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%20%22'+ticker+'%22%20and%20startDate%20%3D%20%22'+dateRange.start+'%22%20and%20%20endDate%20%3D%20%22'+dateRange.end+'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
#   data: {},
#   success: function(data){
#     if(data.query.count > 0){ // success
#       var priceData = data.query.results.quote;
#       ServerActions.receiveHistoricalPrices(priceData);
#     } else { //silent failure
#       ServerActions.receiveHistoricalPriceErrors(["no results found for "+ticker]);
#     }
#   },
#   error: function(errors){ // loud failure
#     ServerActions.receiveHistoricalPriceErrors(errors);
#   }
# });

class Api::StocksController < ApplicationController
  def index
    if query_exists?
      @stocks = Stock.where("stocks.ticker_symbol ILIKE :q", q: "%#{query_param}%")
                     .limit(40)
    else
      @stocks = Stock.limit(40)
    end
    render :index
  end

  def query_exists?
    params[:search] && params[:search] != ""
  end

  def query_param
    params[:search]
  end
end

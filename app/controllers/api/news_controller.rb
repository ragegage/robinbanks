class Api::NewsController < ApplicationController
  def show
    fetch_related_news params[:ticker]
    status = (@data ? 200 : 500)
    render :show
  end

  private
  def fetch_related_news ticker

    url = "http://feeds.finance.yahoo.com/rss/2.0/headline?s="
            .concat(ticker)
            .concat("&region=US&lang=en-US")

    string = HTTP.get(url).to_s


    @feed = Feedjira::Feed.fetch_and_parse url

    if @feed.entries.count.to_i > 0
      @news = @feed.entries
    else
      @news = nil
      @errors = ["news could not be loaded"]
    end
    
  end
end

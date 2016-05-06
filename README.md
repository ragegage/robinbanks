![robinbanks-logo]
[robinbanks-logo]: ./public/robinbanks.png
[live][robinbanks]
[robinbanks]: http://www.robinbanks.herokuapp.com

####Robinbanks provides you with live* data on all the stocks you might be interested in. 
####Sign up and add stocks to your watchlist to see snapshot summaries of their current prices as well as sparklines of their performance over the past month. 
####It's built on a Postgres/Rails/React stack, so it's solid, easily extendable, and highly efficient in your browser.

##Features

Robinbanks allows you to sign up to save your data for later, or log in as a guest user to quickly check the site out.
![login-screenshot]
[login-screenshot]: ./login-screenshot.png

Robinbanks fetches your personal settings upon login, including your watchlist of stocks.
![index-screenshot]
[index-screenshot]: ./index-screenshot.png

Robinbanks lets you add and remove stocks from your watchlist.
![search-screenshot]
[search-screenshot]: ./search-screenshot.png

Robinbanks gives you day-by-day pricing data on an easy-to-read chart, as well as related news articles, for any of your stocks.
![stockshow-screenshot]
[stockshow-screenshot]: ./stockshow-screenshot.png

Robinbanks keeps your password data safe.
```ruby
def password=(password)
  @password = password
  self.password_digest = BCrypt::Password.create(password)
end

def is_password?(password)
  BCrypt::Password.new(self.password_digest).is_password?(password)
end
```

##Implementation

The database is seeded with the ticker symbols of the most-valued companies in the world as "Stocks" in a `stocks` table.
Each robinbanks `user` is created with an associated `list`. Adding a stock to that list creates a new associated row in a `stock_list_items` join table-- each row has a reference to a stock's ID and a list's ID.

When a user searches for a stock by its ticker, the stocks whose tickers match that query are selected using a SQL ILIKE statement (a LIKE statement that is indifferent to case) and the first ten of them are passed to the frontend as JSON.

When a user logs in, the stocks on that user's list are selected using an ActiveRecord query (user.list.stocks) and combined with both the current price and the past month's prices and passed to the frontend as JSON.

Upon selecting a stock, the appropriate historical data (past month/3M/6M/1Y) are passed to the frontend, as are the most recently published news articles about that company.

The price data is retrieved from various Yahoo APIs:
- the current price from Yahoo's finance API (https://finance.yahoo.com/webservice/v1/symbols/STOCK_TICKER/quote?format=json)
- the historical price data from a variety of tables accessible via YQL (https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%20%22***STOCK_TICKER***%22%20and%20startDate%20%3D%20%22***START_DATE***%22%20and%20%20endDate%20%3D%20%22***END_DATE***%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys)
- the related news articles from Yahoo Finance's RSS feed API (http://feeds.finance.yahoo.com/rss/2.0/headline?s=GOOG&region=US&lang=en-US) 

Once the data reach the frontend, they are handled by the appropriate stores:
- the ListStore holds all of the data that the list needs: the stocks (in order) and their related data.
- the HistoricalPriceStore holds the data that the chart needs: the time-ordered price data consisting of the date and that date's closing price.
- the NewsStore holds the data that the "Related News" section needs: the related headlines, URLs, and publishing dates of the most recently published articles about the selected company.

The Sparklines are made using the `react-sparklines` module.

The Chart is made using a custom-built Chart component that renders the data onto an HTML5 Canvas element, dynamically updates when it receives new data, and provides customizeable hover functionality.

*price data are not guaranteed to be live.

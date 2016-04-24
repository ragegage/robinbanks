# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new` aliased to `GET /signup`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new` aliased to `GET /login`
- `POST /session`
- `DELETE /session`

## JSON API

### StockListItems

- `GET /api/stock_list_items`
- `POST /api/stock_list_items`
- `GET /api/stock_list_items/:id`
- `PATCH /api/stock_list_items/:id`
- `DELETE /api/stock_list_items/:id`

### Stocks

- `GET /api/stocks`
  - Only used for search purposes and to provide an id reference for `POST` requests to `api/stock_list_items`

## External JSON API

### StockPrice

- `GET YAHOO_STOCK_PRICE_API_URL`

NB: potentially https://finance.yahoo.com/webservice/v1/symbols/STOCK_TICKER/quote?format=json or https://finance.yahoo.com/webservice/v1/symbols/STOCK_TICKER/quote?format=json&view=detail

### HistoricalStockPrices

- `GET YAHOO_HISTORICAL_STOCK_PRICE_API_URL`

NB: potentially https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%20%22***STOCK_TICKER***%22%20and%20startDate%20%3D%20%22***START_DATE***%22%20and%20%20endDate%20%3D%20%22***END_DATE***%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys (a YQL REST API with dates in the form "2016-03-24")

### StockNews

- `GET YAHOO_STOCK_NEWS_API_URL`

NB: potentially http://finance.yahoo.com/rss/headline?s=STOCK_TICKER or http://finance.yahoo.com/rss/industry?s=STOCK_TICKER

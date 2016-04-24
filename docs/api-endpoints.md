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

### HistoricalStockPrices

- `GET YAHOO_HISTORICAL_STOCK_PRICE_API_URL`

### StockNews

- `GET YAHOO_STOCK_NEWS_API_URL`

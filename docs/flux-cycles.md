# Flux Cycles

## Stock Cycles

### Stocks API Request Actions

* `fetchAllStocks`
  0. invoked from `StocksIndex` `componentDidMount`/`willReceiveProps`
  0. `GET /api/stock_list_items` is called with `current_user.id` as params.
  0. `receiveAllStocks` is set as the callback.

* `createStocksIndexItem`
  0. invoked from button `onClick` inside `Search` component.
  0. `POST /api/stock_list_items` is called.
  0. `receiveSingleStock` is set as the callback.

* `updateStocksIndexItem`
  0. invoked from `drag` event inside `StocksIndex`
  0. `PATCH /api/stock_list_items` is called.
  0. `receiveAllStocks` is set as the callback.

N.B. you can only update a stock insofar as changing its place in your `StocksIndex`; because the ordering will be done in the style of a linked list on the backend, this will require changing three `StocksIndexItem`s: the one being moved, the node that was formerly immediately before it, and the node that is now immediately before it. One `drag` event will cause three `updateStocksIndexItem` calls.

* `destroyStocksIndexItem`
  0. invoked from delete stock button `onClick`
  0. `DELETE /api/stock_list_items/:id` is called.
  0. `PATCH /api/stock_list_items` is also called to connect any nodes that were disrupted by the removal of one.
  0. `receiveAllStocks` is set as the callback.

### Stocks API Response Items

* `receiveAllStocks`
  0. invoked from an API callback.
  0. `Stock` store replaces `_stocks` and emits change.

N.B. `_stocks` is an array in the stock store.

* `receiveSingleStock`
  0. invoked from an API callback.
  0. `Stock` store pushes new stock onto `_stocks` and emits change.

### Store Listeners

* `StocksIndex` component listens to `Stock` store.
* `StockDetail` component listens to `Stock` store.

## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `StockSearchBar` `onChange` when there is text
  0. `GET /api/stocks` is called with `ticker_symbol` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `StockSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.



## StockPrice Cycle

### StockPrice API Request Items

* `fetchStockPrice`
  0. invoked from `StocksIndex` `onChange`
  0. `GET YAHOO_STOCK_PRICE_API_URL` is called with `ticker_symbol` param.
  0. `receiveStockPrice` is set as the callback.
  
### StockPrices API Response Items

* `receiveStockPrice`
  0. invoked as an API callback
  0. `StockPrice` store updates `_stockPrices` and emits change.

### Store Listeners

* `StocksIndex` component listens to `StockPrice` store.
* `StockDetail` component listens to `StockPrice` store.

## StockDetails Cycle

### HistoricalStockPrices API Request Items

* `fetchHistoricalStockPrices`
  0. invoked from `StockDetail` `componentDidMount`/`willReceiveProps`
  0. `GET YAHOO_HISTORICAL_STOCK_PRICE_API_URL` is called with `ticker_symbol` and `date_range` params.
  0. `receiveHistoricalStockPrices` is set as the callback.

### HistoricalStockPrices API Response Items

* `receiveHistoricalStockPrices`
  0. invoked as an API callback
  0. `HistoricalStockPrice` store updates `_historicalStockPrices` and emits change.

### Store Listeners

* `StockDetail` component listens to `HistoricalStockPrice` store.

## StockNews Cycle

### StockNews API Request Items

* `fetchStockNews`
  0. invoked from `StockDetail` `componentDidMount`/`willReceiveProps`
  0. `GET YAHOO_STOCK_NEWS_API_URL` is called with `ticker_symbol` param.
  0. `receiveStockNews` is set as the callback.

### StockNews API Response Items

* `receiveStockNews`
  0. invoked as an API callback
  0. `StockNews` store updates `_stockNews` and emits change.

### Store Listeners

* `StockDetail` component listens to `StockNews` store.

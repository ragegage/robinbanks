# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Stock Cycles

### Stocks API Request Actions

* `fetchAllStocks`
  0. invoked from `StocksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/stocks` is called.
  0. `receiveAllStocks` is set as the callback.

* `createStocksIndexItem`
  0. invoked from button `onClick` inside `Search` component.
  0. `POST /api/stocklists` is called.
  0. `receiveSingleStock` is set as the callback.

* `updateStocksIndexItem`
  0. invoked from `drag` event inside `StocksIndex`
  0. `POST /api/stocklists` is called.
  0. `receiveSingleStock` is set as the callback.
  N.B. you can only update a stock insofar as changing its place in your `StocksIndex`; because the ordering will be done in the style of a linked list, this will require changing three `StocksIndexItem`s: the one being moved, the node that was formerly immediately before it, and the node that is now immediately before it.

* `destroyStocksIndexItem`
  0. invoked from delete stock button `onClick`
  0. `DELETE /api/stocklists/:id` is called.
  0. `removeNote` is set as the callback.

### Stocks API Response Items

* `receiveAllStocks`
  0. invoked from an API callback.
  0. `Stock` store updates `_stocks` and emits change.

* `receiveSingleStock`
  0. invoked from an API callback.
  0. `Stock` store updates `_stocks[id]` and emits change.

* `removeStock`
  0. invoked from an API callback.
  0. `Stock` store removes `_stocks[id]` and emits change.

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
## StockDetails Cycles

json.array! @stocks do |stock|

  json.id stock.id
  json.ticker_symbol stock.ticker_symbol

end

json.array! @ordered_list do |item|
  json.id item.id
  json.ticker_symbol item.stock.ticker_symbol
end

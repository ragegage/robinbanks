json.array! @ordered_list do |pair|
  json.id pair[0].id
  json.ticker_symbol pair[0].stock.ticker_symbol
  json.price pair[1]["resource"]["fields"]["price"].to_f.round(2)
end

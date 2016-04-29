json.array! @ordered_list do |bundle|
  json.id bundle[0][0].id
  json.ticker_symbol bundle[0][0].stock.ticker_symbol
  json.price bundle[0][1]["resource"]["fields"]["price"].to_f.round(2)
  json.historical_data bundle[1]
end

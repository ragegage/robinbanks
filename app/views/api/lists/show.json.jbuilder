if @ordered_list
  json.array! @ordered_list do |bundle|
    json.id bundle[0][0].id
    json.ticker_symbol bundle[0][0].stock.ticker_symbol
    if bundle[0][1]
      json.price bundle[0][1]["resource"]["fields"]["price"].to_f.round(2)
    else
      json.price 0.00
    end
    json.historical_data bundle[1]
  end
else
  json.array! @errors
end

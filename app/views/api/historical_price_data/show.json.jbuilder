json.array! @data do |datum|
  json.ticker: datum["Symbol"],
  json.date: datum["Date"],
  json.close: datum["Close"].to_f.round(2)
end

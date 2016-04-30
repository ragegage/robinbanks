json.array! @news do |item|
  json.title item.title
  json.url item.url
  json.date item.published
end

if @user
  json.extract! @user, :id, :username
end
if @errors
  json.array! @errors
end

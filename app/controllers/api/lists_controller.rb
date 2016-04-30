class Api::ListsController < ApplicationController
  def show
    generate_ordered_array current_user.list
    status = (@ordered_array ? 200 : 404)
    @errors = ["cannot access list at this moment"] unless @ordered_array
    render :show
  end
end

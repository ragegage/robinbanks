class Api::ListsController < ApplicationController
  def show
    generate_ordered_array current_user.list
    debugger
    if @ordered_list
      render :show
    else
      render json: @errors << "cannot access list at this moment", status: 404
    end
  end
end

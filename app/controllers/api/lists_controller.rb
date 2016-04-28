class Api::ListsController < ApplicationController
  def show
    generate_ordered_array current_user.list
    render :show
  end
end

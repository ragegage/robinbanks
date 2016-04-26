class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login! @user
      status = 200
      render 'api/users/show', status: status
    else
      status = 500
      @errors = ["invalid username or password"]
      render 'api/users/show', status: status
    end
  end
  def destroy
    if current_user
      @user = current_user
      logout!
      status = 200
      render 'api/users/show', status: status
    else
      status = 500
      @errors = ["nobody is logged in"]
      render 'api/users/show', status: status
    end
  end
end

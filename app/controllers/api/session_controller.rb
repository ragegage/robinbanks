class Api::SessionController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username]
                                     params[:user][:password])
    if @user
      @user.login!
      status = 200
      render 'api/user/show' status: status
    else
      status = 500
      @errors = @user.errors.full_messages
      render 'api/user/show' status: status
    end
  end
  def destroy
    if current_user
      current_user.logout!
      status = 200
      @user = current_user
      render 'api/user/show' status: status
    else
      status = 500
      @errors = ["nobody is logged in"]
      render 'api/user/show' status: status
    end
  end
end

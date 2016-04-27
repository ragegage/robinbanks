class Api::UsersController < ApplicationController
  def show
    @user = current_user
    render :show
  end
  def create
    @user = User.new(user_params)
    if @user.save
      @list = List.create(user_id: @user.id)
      @list.populate_self!
      login! @user
      status = 200
      render :show, status: status
    else
      status = 500
      @errors = @user.errors.full_messages
      render :show, status: status
    end
  end
  def destroy
    @user = current_user
    if @user.destroy
      @user.list.depopulate_self!
      @user.list.destroy
      status = 200
      render :show, status: status
    else
      status = 500
      @errors = @user.errors.full_messages
      render :show, status: status
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end

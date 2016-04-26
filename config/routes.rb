Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  namespace :api do
    resource :user, only: [:show, :create, :destroy]
    resource :session, only: [:create, :destroy]
  end
end

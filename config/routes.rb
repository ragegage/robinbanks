Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:show, :create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:index]
    resources :stock_list_items, only: [:create, :update, :destroy]
    resource :list, only: [:show]
  end
end

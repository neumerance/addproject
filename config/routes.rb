Rails.application.routes.draw do
  devise_for :users
  root to: 'lobby#index'

  resources :rooms do
    member do
      post :create_token
      get :get_users
    end
  end
end

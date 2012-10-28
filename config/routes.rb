ShottenTotten::Application.routes.draw do
  root to: "pages#home"

  resources :games, only: [:create, :show] do
    get 'user_info', :on => :collection

    resources :users, only: :create

    resources :cards, only: [:index, :update]

    resources :stones, only: [:index, :update]
  end
end

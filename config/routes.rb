ShottenTotten::Application.routes.draw do
  root to: "pages#home"

  resources :games, only: [:create, :show] do
    get 'user_info', :on => :collection
  end
end

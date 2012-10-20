ShottenTotten::Application.routes.draw do
  root to: "pages#home"

  resources :games
end

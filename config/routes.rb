Rails.application.routes.draw do
  resources :reports
  resources :users
  resources :locations
  resources :categories




  post "/login", to: "sessions#create"


  delete "/logout", to: "sessions#delete"


end
